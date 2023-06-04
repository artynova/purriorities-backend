import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Stage} from "./stage.entity";
import {StagesController} from "./stages.controller";
import {StagesService} from "./stages.service";
import {StagesMapper} from "./stages.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Stage])],
    controllers: [StagesController],
    providers: [StagesService, StagesMapper],
})
export class StagesModule {}