import { ReadManyDtoBase } from '../../../common/resource-base/read-many.dto-base';
import { ReadUserDto } from './read-user.dto';

export class ReadManyUsersDto extends ReadManyDtoBase<ReadUserDto> {
    data: ReadUserDto[];
}
