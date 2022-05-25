import { User } from '../entities/user.entity';

export class CreateUserReturnDto {

    ok: boolean;

    data: User;

    error: string;
}
