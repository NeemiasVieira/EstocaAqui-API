import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dotevn from 'dotenv';
import FormData from 'form-data';

dotevn.config();

@Injectable()
export class UploaderService {
    private readonly logger = new Logger("UploaderService");

    async uploadImage(file: Express.Multer.File): Promise<any> {
        this.logger.log("Upload de imagem");

        const formData = new FormData();
        formData.append('image', file.buffer, { filename: file.originalname });

        try {
            const clientId = process.env.CLIENT_ID;
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: `Client-ID ${clientId}`,
                    ...formData.getHeaders(),
                },
            });

            if (response.data.data.link) this.logger.verbose("200 - Upload de imagem realizado");

            return response.data.data.link;
        } catch (error) {
            this.logger.error("500 - Erro ao tentar realizar upload da imagem");
            throw new HttpException('Falha ao fazer upload da imagem.', 500);
        }
    }
}