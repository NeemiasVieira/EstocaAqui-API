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

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    EntradasModule,
    FornecedorModule,
    ProdutosModule,
    GrupoModule,
    SaidaModule,
  ],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger('EstocaAqui-API');

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug(
      'API EstocaAqui iniciada com sucesso em http://localhost:3333 💡🚷🚀',
    );
  }
}
