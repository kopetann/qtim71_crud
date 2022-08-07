import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";
import { UserEntity } from "@app/users/user.entity";

@Entity({ name: "news" })
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({default:''})
  content: string;

  @BeforeInsert()
  private async createSlug() {
    this.slug = slugify(this.title, { lower: true }) + "-" + (((Math.random() * Math.pow(36, 4)) | 0).toString(24));
  }

  @ManyToOne(() => UserEntity, user => user.articles, { eager: true })
  author: UserEntity;
}