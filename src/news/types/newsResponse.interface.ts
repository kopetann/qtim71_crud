import { NewsEntity } from "@app/news/news.entity";

export interface NewsResponseInterface {
  news: NewsEntity[] & { newsCount };
}