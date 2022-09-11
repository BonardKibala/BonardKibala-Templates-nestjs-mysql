import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorateur récupérable @User
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
