import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotevn from 'dotenv';

dotevn.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('O token de acesso é obrigatório', 401);
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
      });
      const subject = decoded.sub;
      request['user'] = { decoded, subject };
    } catch {
      throw new HttpException('O token de acesso é invalido', 401);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private jwtService: JwtService) {}

//   use(request: Request, response: Response, next: NextFunction) {
//     // Take the token
//     const token = request.headers.authorization?.replace('Bearer ', '');

//     if (token) {
//       try {
//         const decoded = this.jwtService.verify(token, {
//           secret: process.env.JWT_SECRET,
//           algorithms: ['HS256'],
//         });

//         const subject = decoded.sub;

//         // Saving the data in request to future uses

//         request['user'] = {decoded, subject};
//         next();

//       } catch (error) {
//         // Case the token is invalid
//         return response.status(401).json({ message: 'Invalid Token' });
//       }
//     } else {
//       // Case the token was not provided
//       return response.status(401).json({ message: 'Token is required' });
//     }
//   }
// }
