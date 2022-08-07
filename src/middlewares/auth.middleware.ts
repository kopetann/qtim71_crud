import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "@app/users/user.service";
import { ExpressRequestInterface } from "@app/interfaces/expressRequest.interface";
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_WORD } from "@app/config/const";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {
  }

  async use(req: any, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = await verify(token, SECRET_WORD);
      const user = await this.userService.findById(decoded.id);
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      req.user = null;
      next();
    }
  }
}