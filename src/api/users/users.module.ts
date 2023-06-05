import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesMapper } from '../categories/categories.mapper';
import { Category } from '../categories/category.entity';
import { Quest } from '../quests/quest.entity';
import { SkillsMapper } from '../skills/skills.mapper';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Category, Quest])],
    controllers: [UsersController],
    providers: [UsersService, UsersMapper, SkillsMapper, CategoriesMapper],
})
export class UsersModule {}
