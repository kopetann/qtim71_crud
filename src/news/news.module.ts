import { Module } from "@nestjs/common";
import { NewsController } from "@app/news/news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "@app/news/news.entity";
import { NewsService } from "@app/news/news.service";
import { UserEntity } from "@app/users/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([NewsEntity,UserEntity])],
  providers:[NewsService],
  controllers:[NewsController]
})
export class NewsModule{

}