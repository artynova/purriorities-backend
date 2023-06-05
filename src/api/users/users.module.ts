import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Quest } from '../quests/quest.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Category, Quest])],
    controllers: [UsersController],
    providers: [UsersService, UsersMapper],
})
export class UsersModule {}
