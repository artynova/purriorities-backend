import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {SkillsService} from "./skills.service";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {ReadManySkillsDto} from "./dtos/read-many-skills.dto";
import {CreateSkillDto} from "./dtos/create-skill.dto";
import {ReadSkillDto} from "./dtos/read-skill.dto";
import {UpdateSkillDto} from "./dtos/update-skill.dto";

@ApiTags('Skills')
@Controller('api/skills')
export class SkillsController {
    constructor(private readonly service: SkillsService) {
    }

    @Get('')
    async readMany(@Paginate() query: PaginateQuery): Promise<ReadManySkillsDto> {
        return this.service.readAll(query);
    }

    @Post('')
    async create(@Body() createSkillDto: CreateSkillDto): Promise<void> {
        await this.service.create(createSkillDto);
    }

    @Get(':id')
    async readOne(@Param('id') id: string): Promise<ReadSkillDto> {
        return this.service.readOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto): Promise<ReadSkillDto> {
        return this.service.update(id, updateSkillDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ReadSkillDto> {
        return this.service.delete(id);
    }
}