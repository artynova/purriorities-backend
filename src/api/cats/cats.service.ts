import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { randomFromArray } from '../../common/helpers/random';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { Rarity } from '../../common/types/enums';
import { User } from '../users/entities/user.entity';
import { ReadCatOwnershipDto } from './dtos/read-cat-ownership.dto';
import { ReadCatDto } from './dtos/read-cat.dto';
import { ReadManyCatsDto } from './dtos/read-many-cats.dto';
import { CatOwnership } from './entities/cat-ownership.entity';
import { Cat } from './entities/cat.entity';

const catsPaginationConfig: PaginateConfig<Cat> = {
    sortableColumns: ['nameId'],
    defaultSortBy: [['nameId', 'DESC']],
};

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat) private readonly repository: Repository<Cat>,
        @InjectRepository(CatOwnership) private readonly catOwnershipRepository: Repository<CatOwnership>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
        private readonly logicConfig: LogicConfigService,
    ) {}

    async readAll(query: PaginateQuery): Promise<ReadManyCatsDto> {
        return this.mapper.map(
            await paginate(query, this.repository, catsPaginationConfig),
            Paginated<Cat>,
            ReadManyCatsDto,
        );
    }

    async readOne(id: string): Promise<ReadCatDto> {
        return this.mapper.map(await this.findOneOrFail(id), Cat, ReadCatDto);
    }

    async gachaCommon(id: string): Promise<ReadCatOwnershipDto> {
        const user = await this.userRepository.findOneBy({ id });
        if (user.feed < this.logicConfig.commonCaseSettings.price)
            throw new BadRequestException('Not enough feed to buy a common case');
        user.feed -= this.logicConfig.commonCaseSettings.price;
        await this.userRepository.save(user);

        const rarity = this.logicConfig.commonCaseRandomRarity();
        return this.rollCatWithRarity(user, rarity);
    }

    async gachaLegendary(id: string): Promise<ReadCatOwnershipDto> {
        const user = await this.userRepository.findOneBy({ id });
        if (user.catnip < this.logicConfig.legendaryCaseSettings.price)
            throw new BadRequestException('Not enough catnip to buy a legendary case');
        user.catnip -= this.logicConfig.legendaryCaseSettings.price;
        await this.userRepository.save(user);

        const rarity = this.logicConfig.legendaryCaseRandomRarity();
        return this.rollCatWithRarity(user, rarity);
    }

    private async rollCatWithRarity(user: User, rarity: Rarity): Promise<ReadCatOwnershipDto> {
        const cat = randomFromArray(await this.repository.findBy({ rarity }));
        let catOwnership = await this.catOwnershipRepository.findOneBy({ catNameId: cat.nameId, userId: user.id });
        if (catOwnership === null) {
            catOwnership = this.catOwnershipRepository.create({ cat, user });
        } else {
            catOwnership.level++;
            catOwnership.isAway = false;
        }
        const savedCatOwnership = await this.catOwnershipRepository.save(catOwnership);
        savedCatOwnership.cat = cat;
        return this.mapper.map(savedCatOwnership, CatOwnership, ReadCatOwnershipDto);
    }

    private async findOneOrFail(id: string): Promise<Cat> {
        const out = await this.repository.findOne({
            where: { nameId: id },
        }); // as FindOptionsWhere<Entity>); // a little help for typescript to figure out that, since id is present in Resource, id is also present in Entity
        if (out === null) throw new NotFoundException('Required resource was not found in the database');
        return out;
    }
}
