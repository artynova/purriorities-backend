import { AutoMap } from '@automapper/classes';

// readonly class with basic user account data
export class AccountDto {
    @AutoMap()
    id: string;
    @AutoMap()
    email: string;
    @AutoMap()
    nickname: string;
}
