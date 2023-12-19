import { Module } from '@nestjs/common';
import { CreateGrupoController } from './use-cases/create-grupo/create-grupo.controller';
import { GetGrupoController } from './use-cases/get-grupo/get-grupo.controller';
import { DeleteGrupoController } from './use-cases/delete-grupo/delete-grupo.controller';
import { UpdateGrupoController } from './use-cases/update-grupo/update-grupo.controller';
import { CreateGrupoService } from './use-cases/create-grupo/create-grupo.service';
import { DeleteGrupoService } from './use-cases/delete-grupo/delete-grupo.service';
import { UpdateGrupoService } from './use-cases/update-grupo/update-grupo.service';
import { GetGrupoService } from './use-cases/get-grupo/get-grupo.service';
import { VerificaCpnjController } from './use-cases/verifica-cpnj/verifica-cpnj.controller';
import { VerificaCpnjService } from './use-cases/verifica-cpnj/verifica-cpnj.service';

@Module({
  controllers: [
    CreateGrupoController,
    GetGrupoController,
    DeleteGrupoController,
    UpdateGrupoController,
    VerificaCpnjController,
  ],
  providers: [
    CreateGrupoService,
    DeleteGrupoService,
    UpdateGrupoService,
    GetGrupoService,
    VerificaCpnjService,
  ],
})
export class GrupoModule {}
