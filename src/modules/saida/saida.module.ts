import { Module } from '@nestjs/common';
import { CreateSaidaController } from './use-cases/create-saida/create-saida.controlles';
import { CreateSaidaService } from './use-cases/create-saida/create-saida.service';
import { AppService } from 'src/app.service';
import { GetSaidaService } from './use-cases/get-saida/get-saida.service';
import { GetSaidaController } from './use-cases/get-saida/get-saida.controller';
import { DeleteSaidaController } from './use-cases/delete-saida/delete-saida.controller';
import { DeleteSaidaService } from './use-cases/delete-saida/delete-saida.service';
import { UpdateSaidaController } from './use-cases/update-saida/update-saida.controller';
import { UpdateSaidaService } from './use-cases/update-saida/update-saida.service';

@Module({
  controllers: [
    CreateSaidaController,
    GetSaidaController,
    DeleteSaidaController,
    UpdateSaidaController,
  ],
  providers: [
    CreateSaidaService,
    GetSaidaService,
    DeleteSaidaService,
    AppService,
    UpdateSaidaService,
  ],
})
export class SaidaModule {}
