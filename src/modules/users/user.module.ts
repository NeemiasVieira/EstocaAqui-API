import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user-service';
import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';
import { DeleteUserController } from './use-cases/delete-user/delete-user.controller';
import { DeleteUserService } from './use-cases/delete-user/delete-user.service';
import { UpdateUserController } from './use-cases/update-user/update-user.controller';
import { UpdateUserService } from './use-cases/update-user/update-user.service';
import { GetUserController } from './use-cases/get-user/get-user.controller';
import { GetUserService } from './use-cases/get-user/get-user.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7h', algorithm: 'HS256' }
  })],
  controllers: [CreateUserController, LoginController, DeleteUserController, UpdateUserController, GetUserController],
  providers: [CreateUserService, LoginService, DeleteUserService, UpdateUserService, GetUserService]
})

export class UserModule {}