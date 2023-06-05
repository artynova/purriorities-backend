import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { loadObject } from '../../common/helpers/yaml';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { Category } from '../categories/category.entity';
import { Quest } from '../quests/quest.entity';
import { CreateUserDto } from './dtos/create-user.dto';
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

    async sync(id: string): Promise<SyncUserDto> {
        const user = await this.repository.findOne({
            where: { id },
            relations: {
                categories: { quests: { stages: { tasks: true }, questSkills: true } },
                skills: true,
                catOwnerships: { cat: true },
            },
        });

        return this.mapper.map(user, User, SyncUserDto);
    }
}
