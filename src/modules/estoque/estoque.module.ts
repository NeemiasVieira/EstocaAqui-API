import { Module } from '@nestjs/common';

import { GetEstoqueService } from './use-cases/get-estoque/get-estoque.service';
import { GetEstoqueController } from './use-cases/get-estoque/get-estoque.controller';

@Module({
    controllers: [GetEstoqueController],
    providers: [GetEstoqueService]
  })
  export class FornecedorModule {}