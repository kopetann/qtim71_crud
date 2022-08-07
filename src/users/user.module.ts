import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/users/user.entity";
import { UserController } from "@app/users/user.controller";
import { UserService } from "@app/users/user.service";
import { AuthGuard } from "@app/guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService,AuthGuard]
})
export class UserModule {

}
