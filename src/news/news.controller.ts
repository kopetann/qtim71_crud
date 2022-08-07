import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { NewsService } from "@app/news/news.service";
import { CreateNewsDto } from "@app/news/dto/createNewsDto";
import { NewsResponseInterface } from "@app/news/types/newsResponse.interface";
import { AuthGuard } from "@app/guards/auth.guard";
import { DeleteResult } from "typeorm";
import { NewsEntity } from "@app/news/news.entity";
import { UpdateNewsDto } from "@app/news/dto/updateNewsDto";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService
  ) {
  }

  @Get()
  async getNewsList(): Promise<NewsResponseInterface> {
  return await this.newsService.getNewsList();
  }

  @Post()
  async createNews(@Body("news") createNewsDto: CreateNewsDto) {
    const newNews = await this.newsService.createNews(createNewsDto);

    return newNews;
  }

  @Delete(":slug")
  @UseGuards(AuthGuard)
  async deleteNews(@Param("slug") slug: string):Promise<DeleteResult>{
    return this.newsService.deleteNews(slug);
  }

  @Put(":slug")
  @UseGuards(AuthGuard)
  async updateNews(@Param("slug")slug:string,@Body("news") news:UpdateNewsDto) {
    return this.newsService.updateNews(slug,news);
  }
}
