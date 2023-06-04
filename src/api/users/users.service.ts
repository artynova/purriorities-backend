import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends ResourceService<User, CreateUserDto, ReadUserDto, ReadManyUsersDto, UpdateUserDto> {
    constructor(@InjectRepository(User) repository: Repository<User>, @InjectMapper() mapper: Mapper) {
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
    }
}
