import { ReadManyMeta } from './read-many-meta.dto';

export class ReadManyDtoBase<ReadOneDto> {
    data: ReadOneDto[]; // must be explicitly overridden with ReadOneDto in implementing class for swagger docs to pick up on this property properly
    meta: ReadManyMeta;
}
