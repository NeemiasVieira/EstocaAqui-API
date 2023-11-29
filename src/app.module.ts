import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UserModule } from './modules/users/user.module';
import { EntradasModule } from './modules/entradas/entradas.module';
import { AuthModule } from './middlewares/auth-module/auth-module.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, EntradasModule],  
  controllers: [AppController],
  providers: [AuthGuard],
})
export class AppModule {}
