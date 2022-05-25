import { User } from '../entities/user.entity';

export class FindUsersReturnDto {

    ok: boolean;

    total: number;

    data: User[];

    error: string;
}
