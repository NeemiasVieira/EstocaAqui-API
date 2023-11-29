import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from 'src/middlewares/auth';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EntradasModule } from './modules/entradas/entradas.module';

@Module({
  imports: [DatabaseModule, UserModule, 
    
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7h', algorithm: 'HS256' }
  }), EntradasModule],  
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    //Rotas cobertas pelo sistema de tokens

    consumer
      .apply(AuthMiddleware)
      .forRoutes('/create-entrada' , '/get-entrada', 'delete-entrada', 'update-entrada'); 
  }
}