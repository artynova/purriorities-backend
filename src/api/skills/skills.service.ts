import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { ReadManySkillsDto } from './dtos/read-many-skills.dto';
import { ReadSkillDto } from './dtos/read-skill.dto';
import { UpdateSkillDto } from './dtos/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService extends ResourceService<
    Skill,
    CreateSkillDto,
    ReadSkillDto,
    ReadManySkillsDto,
    UpdateSkillDto
> {
    constructor(@InjectRepository(Skill) repository: Repository<Skill>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                select: ['id', 'name', 'level', 'levelExp'],
            },
            mapper,
            Skill,
            CreateSkillDto,
            ReadSkillDto,
            ReadManySkillsDto,
            UpdateSkillDto,
        );
    }
}
