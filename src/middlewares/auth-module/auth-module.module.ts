import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotevn from 'dotenv';

dotevn.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '50h', algorithm: 'HS256' },
    }),
  ],
  exports: [],
})
export class AuthModule {}
