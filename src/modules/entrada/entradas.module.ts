import { Module } from '@nestjs/common';
import { DeleteEntradaController } from './use-cases/delete-entrada/delete-entrada.controller';
import { UpdateEntradaController } from './use-cases/update-entrada/update-entrada.controller';
import { CreateEntradaController } from './use-cases/create-entrada/create-entrada.controller';
import { GetEntradaController } from './use-cases/get-entrada/get-entrada.controller';
import { GetEntradaService } from './use-cases/get-entrada/get-entrada.service';
import { CreateEntradaService } from './use-cases/create-entrada/create-entrada.service';
import { DeleteEntradaService } from './use-cases/delete-entrada/delete-entrada.service';
import { UpdateEntradaService } from './use-cases/update-entrada/update-entrada.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [DeleteEntradaController, UpdateEntradaController, CreateEntradaController, GetEntradaController],
  providers: [GetEntradaService, CreateEntradaService, DeleteEntradaService, UpdateEntradaService, AppService],
})
export class EntradasModule {}
