import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../quests/entities/quest.entity';
import { QuestsMapper } from '../quests/quests.mapper';
import { User } from '../users/entities/user.entity';
import { UsersMapper } from '../users/users.mapper';
import { CategoriesController } from './categories.controller';
import { CategoriesMapper } from './categories.mapper';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, User, Quest])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesMapper, UsersMapper, QuestsMapper],
})
export class CategoriesModule {}
