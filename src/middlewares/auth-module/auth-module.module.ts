import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotevn from 'dotenv';
import { AuthGuard } from './auth';

dotevn.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '50h', algorithm: 'HS256' },
    }),
  ],
  providers: [AuthGuard],
  exports: [],
})
export class AuthModule {}
