import { UserEntity } from "@app/users/user.entity";

export { Express } from "express";

export interface ExpressRequestInterface extends Request {
  user?: UserEntity;
  authorization?:string;
}