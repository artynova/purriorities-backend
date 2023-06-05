import { ReadManyDtoBase } from '../../../common/resource-base/read-many.dto-base';
import { ReadCatDto } from './read-cat.dto';

export class ReadManyCatsDto extends ReadManyDtoBase<ReadCatDto> {
    data: ReadCatDto[];
}
