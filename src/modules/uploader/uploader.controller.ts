import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('uploader')
@ApiTags("Uploader")
export class UploaderController {
constructor(private readonly imgurService: UploaderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ link: any }> {
    const link = await this.imgurService.uploadImage(file);
    return { link };
  }
}
