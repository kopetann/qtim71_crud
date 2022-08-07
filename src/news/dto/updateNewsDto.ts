import { NewsEntity } from "@app/news/news.entity";

export class UpdateNewsDto{
  readonly title?:string;
  readonly content?:string
}