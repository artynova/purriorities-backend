import { Mapper } from '@automapper/core';
import { BadRequestException, NotFoundException, Type } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { FindOptionsWhere, Repository } from 'typeorm';
import { buildErrorsString } from '../helpers/validation';
import { ReadManyDtoBase } from './read-many.dto-base';
import { Resource } from './resource.entity-base';

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

    async readAll(query: PaginateQuery): Promise<ReadManyDto> {
        return this.mapper.map(
            await paginate(query, this.repository, this.paginateConfig),
            Paginated<Entity>,
            this.readManyDtoType,
        );
    }

    async readOne(id: string): Promise<ReadOneDto> {
        return this.mapper.map(await this.findOneOrFail(id), this.entityType, this.readOneDtoType);
    }

    async update(id: string, updateUserDto: UpdateDto): Promise<ReadOneDto> {
        const oldEntity = await this.findOneOrFail(id);
        const inEntity = this.mapper.map(updateUserDto, this.updateDtoType, this.entityType);
        const newEntity: Entity = { ...oldEntity, ...inEntity };
        this.validateRequestOrFail(newEntity); // since dto is partial, this validation is needed
        return this.mapper.map(await this.repository.save(newEntity), this.entityType, this.readOneDtoType);
    }

    async delete(id: string): Promise<ReadOneDto> {
        const toRemove = await this.findOneOrFail(id);
        return this.mapper.map(await this.repository.remove(toRemove), this.entityType, this.readOneDtoType);
    }

    protected async findOneOrFail(id: string): Promise<Entity> {
        const out = await this.repository.findOneBy({ id } as FindOptionsWhere<Entity>); // a little help for typescript to figure out that, since id is present in Resource, id is also present in Entity
        if (out === null) throw new NotFoundException('Required resource was not found in the database');
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
