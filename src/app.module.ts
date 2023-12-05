import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UserModule } from './modules/users/user.module';
import { EntradasModule } from './modules/entradas/entradas.module';
import { AuthModule } from './middlewares/auth-module/auth-module.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { CreateGrupoController } from './modules/grupos/use-cases/create-grupo/create-grupo.controller';
import { DeleteGrupoController } from './modules/grupos/use-cases/delete-grupo/delete-grupo.controller';
import { UpdateGrupoController } from './modules/grupos/use-cases/update-grupo/update-grupo.controller';
import { GetGrupoController } from './modules/grupos/use-cases/get-grupo/get-grupo.controller';
import { GetGrupoService } from './modules/grupos/use-cases/get-grupo/get-grupo.service';
import { CreateGrupoService } from './modules/grupos/use-cases/create-grupo/create-grupo.service';
import { DeleteGrupoService } from './modules/grupos/use-cases/delete-grupo/delete-grupo.service';
import { UpdateGrupoService } from './modules/grupos/use-cases/update-grupo/update-grupo.service';
import { GruposModule } from './modules/grupos/grupos.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    EntradasModule,
    FornecedoresModule,
    GruposModule,
  ],
  controllers: [
    AppController,
    CreateGrupoController,
    DeleteGrupoController,
    UpdateGrupoController,
    GetGrupoController,
  ],
  providers: [
    AuthGuard,
    GetGrupoService,
    CreateGrupoService,
    DeleteGrupoService,
    UpdateGrupoService,
  ],
})
export class AppModule implements OnApplicationBootstrap {

  private readonly logger = new Logger("EstocaAqui-API");

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug("API EstocaAqui iniciada com sucesso em http://localhost:3333 💡🚷🚀")
  }
}
