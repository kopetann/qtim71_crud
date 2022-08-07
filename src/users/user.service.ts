import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/users/user.entity";
import { CreateUserDto } from "@app/users/dto/createUserDto";
import { Repository } from "typeorm";
import { ExpressRequestInterface } from "@app/interfaces/expressRequest.interface";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { SECRET_WORD } from "@app/config/const";
import { UserResponseInterface } from "@app/users/types/userResponse.interface";
import { LoginDto } from "../../../../Projects_N/crud_learn/src/user/dto/login.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email
    });
    const userByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username
    });
    if (userByEmail || userByUsername) {
      throw new HttpException("Email or username are taken", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  private generateToken(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email
    }, SECRET_WORD);
  }

  async login(loginUserDto: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email
      },
      select: ["id", "username", "email", "bio", "password"]
    });
    if (!user) {
      throw new HttpException("Login isn't valid", HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
    const isPasswordCorrect = await compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException("Password isn't valid", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    return user;
  }

  createUserObject(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateToken(user)
      }
    };

  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id }
    });
  }
}