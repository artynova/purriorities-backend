import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillsController } from './skills.controller';
import { SkillsMapper } from './skills.mapper';
import { SkillsService } from './skills.service';

@Module({
    imports: [TypeOrmModule.forFeature([Skill])],
    controllers: [SkillsController],
    providers: [SkillsService, SkillsMapper],
})
export class SkillsModule {}
