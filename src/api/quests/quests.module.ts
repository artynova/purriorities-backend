import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quest} from './entities/quest.entity';
import {QuestsController} from './quests.controller';
import {QuestsMapper} from './quests.mapper';
import {QuestsService} from './quests.service';
import {StagesMapper} from "../stages/stages.mapper";
import {SkillsMapper} from "../skills/skills.mapper";
import {QuestSkill} from "./entities/quest-skill.entity";
import {CategoriesMapper} from "../categories/categories.mapper";
import {StagesModule} from "../stages/stages.module";
import {StagesService} from "../stages/stages.service";
import {TasksService} from "../tasks/tasks.service";
import {TasksMapper} from "../tasks/tasks.mapper";
import {LogicConfigService} from "../../common/processed-config/logic-config.service";
import {CategoriesService} from "../categories/categories.service";
import {CategoriesModule} from "../categories/categories.module";
import {SkillsModule} from "../skills/skills.module";
import {SkillsService} from "../skills/skills.service";
import {Task} from "../tasks/entities/task.entity";
import {Stage} from "../stages/entities/stage.entity";
import {Skill} from "../skills/entities/skill.entity";
import {Category} from "../categories/entities/category.entity";

@Module({
    imports: [StagesModule, CategoriesModule, SkillsModule, TypeOrmModule.forFeature([Task, Stage, Quest, QuestSkill, Category, Skill])],
    controllers: [QuestsController],
    providers: [
        QuestsService,
        StagesService,
        TasksService,
        CategoriesService,
        SkillsService,
        QuestsMapper,
        TasksMapper,
        StagesMapper,
        SkillsMapper,
        CategoriesMapper,
        LogicConfigService
    ],
})

export class QuestsModule {
}
