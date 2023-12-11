import { Module } from '@nestjs/common';
import { CreateSaidaController } from './use-cases/create-saida/create-saida.controlles';
import { CreateSaidaService } from './use-cases/create-saida/create-saida.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [CreateSaidaController],
  providers: [CreateSaidaService, AppService],
})
export class SaidaModule {}
