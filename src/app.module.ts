import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "@app/app.controller";
import { AppService } from "@app/app.service";
import { UserModule } from "@app/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfiguration } from "@app/database/database.configuration";
import { NewsModule } from "@app/news/news.module";
import { AuthMiddleware } from "@app/middlewares/auth.middleware";
import { UserService } from "@app/users/user.service";
import { UserEntity } from "@app/users/user.entity";

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConfiguration
  }), UserModule, NewsModule,TypeOrmModule.forFeature([UserEntity])],
  controllers: [AppController],
  providers: [AppService,UserService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}
