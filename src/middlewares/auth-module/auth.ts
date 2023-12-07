import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotevn from 'dotenv';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Grupo } from 'src/modules/grupo/grupo.model';

dotevn.config();

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger("AuthGuard")
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
      
      const id_usuario = decoded.sub;
      const usuario = await Usuario.findOne({where: {id: id_usuario}});
      const grupo = await Grupo.findOne({where: {id: usuario.id_grupo}});

      request['token'] = { decoded, usuario: usuario.dataValues, grupo: grupo.dataValues};

    } catch(e) {

      this.logger.error("Verifique se o usuário e seu grupo são validos!");
      throw new HttpException('O token de acesso é invalido', 401);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

