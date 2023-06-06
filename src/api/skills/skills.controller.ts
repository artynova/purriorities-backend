import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Patch, Post, Req} from "@nestjs/common";
import {SkillsService} from "./skills.service";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {ReadManySkillsDto} from "./dtos/read-many-skills.dto";
import {CreateSkillDto} from "./dtos/create-skill.dto";
import {ReadSkillDto} from "./dtos/read-skill.dto";
import {UpdateSkillDto} from "./dtos/update-skill.dto";
import {Request} from "express";

@ApiTags('Skills')
@Controller('api/skills')
export class SkillsController {
    constructor(private readonly service: SkillsService) {
    }

    @Get('')
    async readMany(@Req() request: Request, @Paginate() query: PaginateQuery): Promise<ReadManySkillsDto> {
        return this.service.readAllForUser(request.user['id'], query);
    }

    @Post('')
    async create(@Req() request: Request, @Body() createSkillDto: CreateSkillDto): Promise<ReadSkillDto> {
        return await this.service.create({...createSkillDto, userId: request.user['id']});
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