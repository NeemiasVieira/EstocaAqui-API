import { Module } from '@nestjs/common';
import { CreateProdutoController } from './casos-de-uso/create-produto/create-produto-controller';
import { CreateProdutoService } from './casos-de-uso/create-produto/create-produto-service';

@Module({
  controllers: [CreateProdutoController],
  providers: [CreateProdutoService],
})
export class ProdutosModule {}
