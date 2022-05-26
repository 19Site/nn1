import { User } from '../entities/user.entity';

export class UpdateUserReturnDto {

    ok: boolean;

    data: User;

    error: string;
}
