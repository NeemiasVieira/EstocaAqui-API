import { Module } from '@nestjs/common';
import { CreateSaidaController } from './use-cases/create-saida/create-saida.controlles';
import { CreateSaidaService } from './use-cases/create-saida/create-saida.service';
import { AppService } from 'src/app.service';
import { GetSaidaService } from './use-cases/get-saida/get-saida.service';
import { GetSaidaController } from './use-cases/get-saida/get-saida.controller';

@Module({
  controllers: [CreateSaidaController, GetSaidaController],
  providers: [CreateSaidaService, GetSaidaService, AppService],
})
export class SaidaModule {}
