import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "@app/news/news.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateNewsDto } from "@app/news/dto/createNewsDto";
import { UserService } from "@app/users/user.service";
import { UserEntity } from "@app/users/user.entity";
import { promises } from "dns";
import { UpdateNewsDto } from "@app/news/dto/updateNewsDto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>
  ) {
  }

  async getNewsList() {
    const queryPosts = await this.newsRepository.createQueryBuilder("news").leftJoinAndSelect("news.author", "author");
    const newsCount = await queryPosts.getCount();

    const newsList = await queryPosts.getMany();

    return { newsList, newsCount } as any;
  }

  async updateNews(slug: string,body:UpdateNewsDto): Promise<NewsEntity> {
    const news = await this.getBySlug(slug);
    if(!news) {
      throw new HttpException("News " + slug + " does not exist", HttpStatus.NOT_FOUND);
    }
    Object.assign(news,body);
    const updatedNews = await this.newsRepository.save(news)
    return updatedNews;
  }

  buildNewsResponse(news, count) {
    return {
      news: {
        ...news
      },
      count
    };
  }

  async createNews(body: CreateNewsDto): Promise<NewsEntity> {
    const news = new NewsEntity();
    Object.assign(news, body);
    const createdNews = await this.newsRepository.save(news);
    return createdNews;
  }

  async deleteNews(slug: string): Promise<DeleteResult> {
    const news = await this.getBySlug(slug);

    if (!news) {
      throw new HttpException("News " + slug + " does not exist", HttpStatus.NOT_FOUND);
    }

    return await this.newsRepository.delete({ slug });
  }

  async getBySlug(slug: string): Promise<NewsEntity> {
    return await this.newsRepository.findOne({
      where: {
        slug
      }
    });
  }
}