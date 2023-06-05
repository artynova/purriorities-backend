import { AutoMap } from '@automapper/classes';

// readonly class with minimal required identification data, the unchanging user id
export class AccountDto {
    @AutoMap()
    id: string;

    @AutoMap()
    email: string;
}
