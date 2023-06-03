import { AutoMap } from '@automapper/classes';
import { ReadManyDtoBase } from '../../../common/resource-base/read-many.dto-base';
import { UserReadOneDto } from './user-read-one.dto';

export class UserReadManyDto extends ReadManyDtoBase<UserReadOneDto> {
    @AutoMap(() => [UserReadOneDto])
    data: UserReadOneDto[];
}
