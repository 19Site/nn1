import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}
