import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Patch, Post, Req} from "@nestjs/common";
import {CategoriesService} from "./categories.service";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {ReadManyCategoriesDto} from "./dtos/read-many-categories.dto";
import {CreateCategoryDto} from "./dtos/create-category.dto";
import {ReadCategoryDto} from "./dtos/read-category.dto";
import {UpdateCategoryDto} from "./dtos/update-category.dto";
import {Request} from "express";

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}
    
    @Get('')
    async readMany(@Req() request: Request, @Paginate() query: PaginateQuery): Promise<ReadManyCategoriesDto> {
        return this.service.readAll(query, request.user['id']);
    }

    @Post('')
    async create(@Req() request: Request, @Body() createCategoryDto: CreateCategoryDto): Promise<ReadCategoryDto> {
        return await this.service.create({...createCategoryDto, userId: request.user['id']});
    }

    @Get('default')
    async default(@Req() request: Request): Promise<ReadCategoryDto> {
        return this.service.getDefault(request.user['id']);
    }

    @Get(':id')
    async readOne(@Req() request: Request, @Param('id') id: string): Promise<ReadCategoryDto> {
        return this.service.readOne(id, request.user['id']);
    }

    @Patch(':id')
    async update(@Req() request: Request, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<ReadCategoryDto> {
        return this.service.update(id, updateCategoryDto, request.user['id']);
    }

    @Delete(':id')
    async delete(@Req() request: Request, @Param('id') id: string): Promise<ReadCategoryDto> {
        return this.service.delete(id, request.user['id']);
    }

}