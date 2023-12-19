import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateUsuarioController } from './use-cases/create-usuario/create-usuario.controller';
import { CreateUsuarioService } from './use-cases/create-usuario/create-usuario-service';
import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';
import { DeleteUsuarioController } from './use-cases/delete-usuario/delete-usuario.controller';
import { DeleteUsuarioService } from './use-cases/delete-usuario/delete-usuario.service';
import { UpdateUsuarioController } from './use-cases/update-usuario/update-usuario.controller';
import { UpdateUsuarioService } from './use-cases/update-usuario/update-usuario.service';
import { GetUsuarioController } from './use-cases/get-usuario/get-usuario.controller';
import { GetUsuarioService } from './use-cases/get-usuario/get-usuario.service';
import { VerificaCpfController } from './use-cases/verifica-cpf/verifica-cpf.controller';
import { VerificaCpfService } from './use-cases/verifica-cpf/verifica-cpf.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7h', algorithm: 'HS256' },
    }),
  ],
  controllers: [CreateUsuarioController, LoginController, DeleteUsuarioController, UpdateUsuarioController, GetUsuarioController, VerificaCpfController],
  providers: [CreateUsuarioService, LoginService, DeleteUsuarioService, UpdateUsuarioService, GetUsuarioService, VerificaCpfService],
})
export class UsuarioModule {}
