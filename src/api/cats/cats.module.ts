import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./cat.entity";
import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";
import {CatsMapper} from "./cats.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatsService, CatsMapper],
})
export class CatsModule {}