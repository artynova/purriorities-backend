import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {CategoriesMapper} from "./categories.mapper";
import {UsersMapper} from "../users/users.mapper";
import {QuestsMapper} from "../quests/quests.mapper";
import {User} from "../users/entities/user.entity";
import {Quest} from "../quests/quest.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, User, Quest])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesMapper, UsersMapper, QuestsMapper],
})
export class CategoriesModule {}