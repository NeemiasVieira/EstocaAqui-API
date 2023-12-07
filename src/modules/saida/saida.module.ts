import { Module } from '@nestjs/common';
import { CreateSaidaController } from './use-cases/create-saida/create-saida.controlles';
import { CreateSaidaService } from './use-cases/create-saida/create-saida.service';

@Module({
  controllers: [CreateSaidaController],
  providers: [CreateSaidaService],
})
export class SaidaModule {}
