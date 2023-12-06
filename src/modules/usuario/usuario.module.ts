import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateUsuarioController } from './use-cases/create-Usuario/create-Usuario.controller';
import { CreateUsuarioService } from './use-cases/create-Usuario/create-Usuario-service';
import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';
import { DeleteUsuarioController } from './use-cases/delete-Usuario/delete-Usuario.controller';
import { DeleteUsuarioService } from './use-cases/delete-Usuario/delete-Usuario.service';
import { UpdateUsuarioController } from './use-cases/update-Usuario/update-Usuario.controller';
import { UpdateUsuarioService } from './use-cases/update-Usuario/update-usuario.service';
import { GetUsuarioController } from './use-cases/get-Usuario/get-Usuario.controller';
import { GetUsuarioService } from './use-cases/get-Usuario/get-Usuario.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7h', algorithm: 'HS256' }
  })],
  controllers: [CreateUsuarioController, LoginController, DeleteUsuarioController, UpdateUsuarioController, GetUsuarioController],
  providers: [CreateUsuarioService, LoginService, DeleteUsuarioService, UpdateUsuarioService, GetUsuarioService]
})

export class UsuarioModule {}