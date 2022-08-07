import { IsEmail, IsNotEmpty } from "class-validator";
import { UserEntity } from "@app/users/user.entity";

export class CreateUserDto extends UserEntity {
  @IsNotEmpty()
  readonly login: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  password: string;

}