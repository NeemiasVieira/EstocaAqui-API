import { Module } from '@nestjs/common';
import { CreateProdutoController } from './casos-de-uso/create-produto/create-produto-controller';
import { CreateProdutoService } from './casos-de-uso/create-produto/create-produto-service';
import { GetProdutoController } from './casos-de-uso/get-produto/get-produto-controller';
import { GetProdutoService } from './casos-de-uso/get-produto/get-produto-service';
import { DeleteProdutoController } from './casos-de-uso/delete-produto/delete-produto-controller';
import { DeleteProdutoService } from './casos-de-uso/delete-produto/delete-produto-service';

@Module({
  controllers: [
    CreateProdutoController,
    GetProdutoController,
    DeleteProdutoController,
  ],
  providers: [CreateProdutoService, GetProdutoService, DeleteProdutoService],
})
export class ProdutosModule {}
