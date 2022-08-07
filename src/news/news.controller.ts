import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { NewsService } from "@app/news/news.service";
import { CreateNewsDto } from "@app/news/dto/createNewsDto";
import { NewsResponseInterface } from "@app/news/types/newsResponse.interface";
import { AuthGuard } from "@app/guards/auth.guard";

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
  async deleteNews(@Req() request,@Param("slug") slug: string): Promise<any> {
    console.log(request);
    return this.newsService.deleteNews(slug);
  }
}
