import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";
import { NewsEntity } from "@app/news/news.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: "" })
  bio: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => NewsEntity, (article) => article.author)
  articles: NewsEntity[];

  @BeforeInsert()
  async hashPass() {
    this.password = await hash(this.password, 15);
  }
}