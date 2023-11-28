import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(request: Request, response: Response, next: NextFunction) {
    // Take the token
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
          algorithms: ['HS256'],
        });

        const subject = decoded.sub;

        // Saving the data in request to future uses

        request['user'] = {decoded, subject}; 
        next();

      } catch (error) {
        // Case the token is invalid
        return response.status(401).json({ message: 'Token inválido' });
      }
    } else {
      // Case the token was not provided
      return response.status(401).json({ message: 'O Token de acesso é obrigatório' });
    }
  }
}