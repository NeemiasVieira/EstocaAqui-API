import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const APIDescription = `
A API do EstocaAqui é o sistema que vai entregar seu novo controle de estoque! =)
`;

//Carrega as variáveis de ambiente
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('EstocaAqui - API')
    .setDescription(APIDescription)
    .setVersion('1.0')
    .addTag('Usuarios')
    .addTag('Fornecedores')
    .addTag('Entradas')
    .addTag('Grupos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Documentação EstocaAqui - API',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-outline.css',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, //Permite a costumização de mensagens do class-validator
      whitelist: true, //Não permite que campos não esperados sejam enviados para o servidor
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3333);
}
bootstrap();
