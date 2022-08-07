import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExpressRequestInterface } from "@app/interfaces/expressRequest.interface";

export const User = createParamDecorator((data: any, execCtx: ExecutionContext) => {
  const request = execCtx.switchToHttp().getRequest<ExpressRequestInterface>();
  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});