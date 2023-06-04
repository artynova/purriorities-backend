import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {CategoriesMapper} from "./categories.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesMapper],
})
export class CategoriesModule {}