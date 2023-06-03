import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserReadManyDto } from './dtos/user-read-many.dto';
import { UserReadOneDto } from './dtos/user-read-one.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends ResourceService<User, UserCreateDto, UserReadOneDto, UserReadManyDto, UserUpdateDto> {
    constructor(@InjectRepository(User) repository: Repository<User>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: ['joinDate', 'level', 'levelExp'],
            },
            mapper,
            User,
            UserCreateDto,
            UserReadOneDto,
            UserReadManyDto,
            UserUpdateDto,
        );
    }

    async findHashFor(id: string): Promise<string> {
        return (await this.findOneOrFail(id)).passwordHash;
    }
}
