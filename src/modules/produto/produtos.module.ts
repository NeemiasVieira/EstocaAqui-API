import { Module } from '@nestjs/common';
import { CreateProdutoController } from './use-cases/create-produto/create-produto-controller';
import { CreateProdutoService } from './use-cases/create-produto/create-produto-service';
import { GetProdutoController } from './use-cases/get-produto/get-produto-controller';
import { GetProdutoService } from './use-cases/get-produto/get-produto-service';
import { DeleteProdutoController } from './use-cases/delete-produto/delete-produto-controller';
import { DeleteProdutoService } from './use-cases/delete-produto/delete-produto-service';
import { updateProdutoController } from './use-cases/update-produto/update-produto-controller';
import { UpdateProdutoService } from './use-cases/update-produto/update-produto-service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [
    CreateProdutoController,
    GetProdutoController,
    DeleteProdutoController,
    updateProdutoController,
  ],
  providers: [
    CreateProdutoService,
    GetProdutoService,
    DeleteProdutoService,
    UpdateProdutoService,
    AppService
  ],
})
export class ProdutosModule {}
