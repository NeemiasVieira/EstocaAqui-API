import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Caminho onde os arquivos temporários serão armazenados
    })
  ],
  controllers: [UploaderController],
  providers: [UploaderService]
})
export class UploaderModule {}
