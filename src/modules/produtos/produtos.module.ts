import { Module } from '@nestjs/common';
import { CreateProdutoController } from './casos-de-uso/create-produto/create-produto-controller';
import { CreateProdutoService } from './casos-de-uso/create-produto/create-produto-service';
import { GetProdutoController } from './casos-de-uso/get-produto/get-produto-controller';
import { GetProdutoService } from './casos-de-uso/get-produto/get-produto-service';

@Module({
  controllers: [CreateProdutoController, GetProdutoController],
  providers: [CreateProdutoService, GetProdutoService],
})
export class ProdutosModule {}
