import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Patch, Post, Req} from "@nestjs/common";
import {QuestsService} from "./quests.service";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {Request} from "express";

@ApiTags('Quests')
@Controller('api/quests')
export class QuestsController {
    constructor(private readonly service: QuestsService) {}

    @Get('')
    async readMany(
        @Req() request: Request,
        @Paginate() query: PaginateQuery
    ): Promise<ReadManyQuestsDto> {
        return this.service.readAllForUser(request.user['id'], query);
    }

    @Post('')
    async create(@Body() createQuestDto: CreateQuestDto): Promise<void> {
        await this.service.create(createQuestDto);
    }

    @Get(':id')
    async readOne(@Param('id') id: string): Promise<ReadQuestDto> {
        return this.service.readOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto): Promise<ReadQuestDto> {
        return this.service.update(id, updateQuestDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ReadQuestDto> {
        return this.service.delete(id);
    }
}