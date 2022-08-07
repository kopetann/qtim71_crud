import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/users/user.service";
import { User } from "@app/users/decorators/user.decorator";
import { UserEntity } from "@app/users/user.entity";
import { CreateUserDto } from "@app/users/dto/createUserDto";
import { LoginUserDto } from "@app/users/dto/loginUserDto";
import { UserResponseInterface } from "@app/users/types/userResponse.interface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Post("register")
  async createUser(@User() user: UserEntity, @Body("user") createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return this.userService.createUserObject(newUser);
  }

  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(@Body("user") loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    console.log(loginUserDto);
    const loggedUser = await this.userService.login(loginUserDto);
    return this.userService.createUserObject(loggedUser);
  }
}