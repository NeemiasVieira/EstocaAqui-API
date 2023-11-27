import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user-service';
import { LoginController } from './use-cases/login/login.controller';
import { LoginService } from './use-cases/login/login.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7h', algorithm: 'HS256' }
  })],
  controllers: [CreateUserController, LoginController],
  providers: [CreateUserService, LoginService]
})

export class UserModule {}