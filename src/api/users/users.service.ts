import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { subtractTrust } from '../../common/helpers/punishment';
import { loadObject } from '../../common/helpers/yaml';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { Category } from '../categories/entities/category.entity';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { PunishmentDto, RunawayCatDto } from './dtos/punishment.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { SyncUserDto } from './dtos/sync-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

const NONE_CATEGORY_PATH = resolve('assets', 'defaults', 'noneCategory.yaml');

@Injectable()
export class UsersService extends ResourceService<User, CreateUserDto, ReadUserDto, ReadManyUsersDto, UpdateUserDto> {
    private readonly noneCategoryBase: Category;
    private readonly introQuestBase: Quest;

    constructor(
        @InjectRepository(User) repository: Repository<User>,
        @InjectMapper() mapper: Mapper,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Quest) private readonly questRepository: Repository<Quest>,
        @InjectRepository(QuestSkill) private readonly questskillRepository: Repository<QuestSkill>,
        @InjectRepository(CatOwnership) private readonly catOwnershipRepository: Repository<CatOwnership>,
        private readonly logicConfig: LogicConfigService,
    ) {
        super(
            repository,
            {
                sortableColumns: ['joinDate', 'level', 'levelExp'],
            },
            mapper,
            User,
            CreateUserDto,
            ReadUserDto,
            ReadManyUsersDto,
            UpdateUserDto,
        );
        this.noneCategoryBase = loadObject<Category>(NONE_CATEGORY_PATH);
        this.noneCategoryBase.inbox = true;
    }

    override async create(createDto: CreateUserDto): Promise<ReadUserDto> {
        const inputUser = this.mapper.map(createDto, CreateUserDto, User);
        const savedUser = await this.repository.save(inputUser);

        const noneCategory = this.categoryRepository.create({
            ...this.noneCategoryBase,
            userId: savedUser.id,
        });
        await this.categoryRepository.save(noneCategory);

        return this.mapper.map(savedUser, User, ReadUserDto);
    }

    override async delete(id: string, userId?: string): Promise<ReadUserDto> {
        // deleting the quest skills because otherwise their constraints cause deletion problems
        const user = await this.repository.findOne({
            where: { id },
            relations: { categories: { quests: { questSkills: true } } },
        });
        for (const category of user.categories) {
            for (const quest of category.quests) {
                for (const questSkill of quest.questSkills) await this.questskillRepository.remove(questSkill);
            }
        }

        return super.delete(id, userId);
    }

    async readOne(id: string): Promise<ReadUserDto> {
        const user = await this.repository.findOne({
            where: { id },
            relations: {
                catOwnerships: { cat: true },
            },
        });

        return this.mapper.map(user, User, ReadUserDto);
    }

    async sync(id: string): Promise<SyncUserDto> {
        const user = await this.repository.findOne({
            where: { id },
            relations: {
                categories: { quests: { stages: { tasks: true }, questSkills: true } },
                skills: true,
                catOwnerships: { cat: true },
            },
        });
        if (user === null) throw new NotFoundException('Unknown user');

        return this.mapper.map(user, User, SyncUserDto);
    }

    /**
     * Collects and applies all pending punishments for the user since last call.
     * May apply no punishments if none are needed (no newly overdue deadlines etc.).
     */
    async calculatePunishments(id: string): Promise<PunishmentDto> {
        const punishment = new PunishmentDto();
        const extendedUser = await this.repository.findOne({
            where: { id },
            relations: { categories: { quests: true }, catOwnerships: { cat: true } },
        });

        const lastCheckDate = extendedUser.lastPunishmentCheckDate;
        const lastCheckDateEnd = new Date(
            lastCheckDate.getFullYear(),
            lastCheckDate.getMonth(),
            lastCheckDate.getDate() + 1,
        ); // next day after last check
        lastCheckDateEnd.setMilliseconds(lastCheckDateEnd.getMilliseconds() - 1); //last moment of the last check day
        const endCheckDate = new Date();
        const checkDate = lastCheckDateEnd < endCheckDate ? new Date(lastCheckDateEnd) : new Date(endCheckDate);

        const overdues = {} as Record<string, number>;
        const runaways: RunawayCatDto[] = [];
        this.punishForDateWithCutoff(
            extendedUser,
            checkDate,
            lastCheckDate.getHours(),
            lastCheckDate.getMinutes(),
            lastCheckDate.getSeconds(),
            lastCheckDate.getMilliseconds(),
            overdues,
            runaways,
        );

        checkDate.setDate(checkDate.getDate() + 1);
        for (; checkDate < endCheckDate; checkDate.setDate(checkDate.getDate() + 1)) {
            this.punishForDate(extendedUser, checkDate, overdues, runaways);
        }

        if (lastCheckDateEnd < endCheckDate) this.punishForDate(extendedUser, endCheckDate, overdues, runaways); // final punishment, for the non-full last day (if it is, in fact, a separate non-full day, which happens when endCheckDate is greater than last moment of last check date's date)

        for (const id of Object.keys(overdues)) {
            punishment.overdueQuests.push({ id, trustLost: overdues[id] });
        }
        punishment.runawayCats = runaways;

        extendedUser.categories = undefined;
        const catOwnerships = extendedUser.catOwnerships;
        extendedUser.catOwnerships = undefined;
        extendedUser.lastPunishmentCheckDate = endCheckDate;
        await this.repository.save(extendedUser);
        for (const catOwnership of catOwnerships) {
            await this.catOwnershipRepository.save(catOwnership);
        }

        return punishment;
    }

    private punishForDate(extendedUser: User, date: Date, overdues: Record<string, number>, runaways: RunawayCatDto[]) {
        return this.punishForDateWithCutoff(extendedUser, date, 0, 0, 0, 0, overdues, runaways); // midnight start cutoff, passes all quests
    }

    private punishForDateWithCutoff(
        extendedUser: User,
        date: Date,
        cutoffHours: number,
        cutoffMinutes: number,
        cutoffSeconds: number,
        cutoffMilliseconds: number,
        overdues: Record<string, number>,
        runaways: RunawayCatDto[],
    ) {
        for (const category of extendedUser.categories) {
            for (const quest of category.quests) {
                if (!quest.deadline) continue;
                if (quest.deadline >= date) continue;

                if (
                    cutoffHours > quest.deadline.getHours() ||
                    cutoffMinutes > quest.deadline.getMinutes() ||
                    cutoffSeconds > quest.deadline.getSeconds() ||
                    cutoffMilliseconds > quest.deadline.getMilliseconds()
                )
                    continue; // deadline was processed before the cutoff

                overdues[quest.id] = (overdues[quest.id] ?? 0) + this.logicConfig.missDeadlineTrust(quest.priority);

                const runaway = subtractTrust(
                    this.logicConfig.missDeadlineTrust(quest.priority),
                    extendedUser,
                    this.logicConfig,
                    date,
                );
                if (runaway) runaways.push(runaway);
            }
        }
    }
}
