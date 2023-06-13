import {Mapper} from '@automapper/core';
import {BadRequestException, ForbiddenException, NotFoundException, Type} from '@nestjs/common';
import {validateOrReject} from 'class-validator';
import {paginate, PaginateConfig, Paginated, PaginateQuery} from 'nestjs-paginate';
import {FindManyOptions, FindOptionsWhere, Repository} from 'typeorm';
import {buildErrorsString} from '../helpers/validation';
import {ReadManyDtoBase} from './read-many.dto-base';
import {Resource} from './resource.entity-base';

export class ResourceService<
    Entity extends Resource,
    CreateDto,
    ReadOneDto,
    ReadManyDto extends ReadManyDtoBase<ReadOneDto>,
    UpdateDto,
> {
    constructor(
        protected readonly repository: Repository<Entity>,
        protected readonly paginateConfig: PaginateConfig<Entity>,
        protected readonly mapper: Mapper,
        protected readonly entityType: Type<Entity>,
        protected readonly createDtoType: Type<CreateDto>,
        protected readonly readOneDtoType: Type<ReadOneDto>,
        protected readonly readManyDtoType: Type<ReadManyDto>,
        protected readonly updateDtoType: Type<UpdateDto>,
    ) {}

    async create(createDto: CreateDto): Promise<ReadOneDto> {
        const inEntity = this.mapper.map(createDto, this.createDtoType, this.entityType); // valid because of dto validation

        return this.mapper.map(await this.repository.save(inEntity), this.entityType, this.readOneDtoType);
    }

    async readAll(query: PaginateQuery, userId?: string): Promise<ReadManyDto> {
        const findOptions: FindManyOptions = {
            where: {userId: userId}
        };

        return this.mapper.map(
            await paginate(query, this.repository, {...this.paginateConfig, ...findOptions} as PaginateConfig<Entity>),
            Paginated<Entity>,
            this.readManyDtoType,
        );
    }

    async readOne(id: string, userId?: string): Promise<ReadOneDto> {
        return this.mapper.map(await this.findOneOrFail(id, userId), this.entityType, this.readOneDtoType);
    }

    async update(id: string, updateDto: UpdateDto, userId?: string): Promise<ReadOneDto> {
        const oldEntity = await this.findOneOrFail(id, userId);
        const inEntity = this.mapper.map(updateDto, this.updateDtoType, this.entityType);
        const newEntity: Entity = { ...oldEntity, ...inEntity };

        await this.validateRequestOrFail(newEntity); // since dto is partial, this validation is needed

        return this.mapper.map(await this.repository.save(newEntity), this.entityType, this.readOneDtoType);
    }

    async delete(id: string, userId?: string): Promise<ReadOneDto> {
        const toRemove = await this.findOneOrFail(id, userId);

        return this.mapper.map(await this.repository.remove(toRemove), this.entityType, this.readOneDtoType);
    }

    protected async findOneOrFail(id: string, userId?: string): Promise<Entity> {
        //TODO withDelete will only work if rewrite it using a query builder!!!
        const out = await this.repository.findOne({
            withDeleted: true,
            relations: this.paginateConfig.relations,
            where: { id } as FindOptionsWhere<Entity>,
        }); // a little help for typescript to figure out that, since id is present in Resource, id is also present in Entity

        if (out === null)
            throw new NotFoundException('Required resource was not found in the database');

        if (userId && out['userId'] != userId)
            throw new ForbiddenException("Cannot access and manipulate other users' data");

        return out;
    }

    protected async validateRequestOrFail(entity: Entity): Promise<void> {
        try {
            await validateOrReject(entity);
        } catch (errors) {
            throw new BadRequestException('Request resulted in errors:\n' + buildErrorsString(errors));
        }
    }
}
