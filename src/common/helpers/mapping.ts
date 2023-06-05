import { Mapper, createMap, forMember, mapFrom, mapWith } from '@automapper/core';
import { Type } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { ReadManyMeta } from '../resource-base/read-many-meta.dto';
import { ReadManyDtoBase } from '../resource-base/read-many.dto-base';

export function createPaginatedToReadManyMap<Entity, ReadOneDto, ReadManyDto extends ReadManyDtoBase<ReadOneDto>>(
    mapper: Mapper,
    entityType: Type<Entity>,
    readOneDtoType: Type<ReadOneDto>,
    readManyDtoType: Type<ReadManyDto>,
) {
    typeof entityType;
    return createMap(
        mapper,
        Paginated<Entity>,
        readManyDtoType,
        // data payload
        forMember(
            (readManyDto) => readManyDto.data,
            mapWith(readOneDtoType, entityType, (source) => source.data),
        ),
        // pagination information
        forMember(
            (readManyDto) => readManyDto.meta,
            mapFrom((entity) => {
                return {
                    itemsPerPage: entity.meta.itemsPerPage,
                    totalItems: entity.meta.totalItems,
                    currentPage: entity.meta.currentPage,
                    totalPages: entity.meta.totalPages,
                } as ReadManyMeta;
            }),
        ),
    );
}
