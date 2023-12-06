import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UserModule } from './modules/users/user.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { EntradasModule } from './modules/entradas/entradas.module';
import { AuthModule } from './middlewares/auth-module/auth-module.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { GruposModule } from './modules/grupos/grupos.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    EntradasModule,
    FornecedoresModule,
    ProdutosModule,
    GruposModule,
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
