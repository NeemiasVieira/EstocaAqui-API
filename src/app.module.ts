import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProdutosModule } from './modules/produto/produtos.module';
import { EntradasModule } from './modules/entrada/entradas.module';
import { AuthModule } from './middlewares/auth-module/auth-module.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { GrupoModule } from './modules/grupo/grupo.module';
import { SaidaModule } from './modules/saida/saida.module';
import { AppService } from './app.service';
import { UploaderModule } from './modules/uploader/uploader.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, UsuarioModule, AuthModule, EntradasModule, FornecedorModule, ProdutosModule, GrupoModule, SaidaModule, UploaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger('EstocaAqui-API');

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug('API EstocaAqui iniciada com sucesso em http://localhost:3333 💡🚷🚀');
  }
}
