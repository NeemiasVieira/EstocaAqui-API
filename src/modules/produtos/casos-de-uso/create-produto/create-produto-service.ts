import { HttpException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../produto.model';

@Injectable()
export class CreateProdutoService {
  async createProduto(
    produtoASerCadastrado: CreateProdutoDto,
  ): Promise<Produto> {
    //Quais serão as regras para criação de produto?
    if (produtoASerCadastrado)
      throw new HttpException('Usuário já existe! Tente novamente', 400);

    const novoProduto = await Produto.create({ ...produtoASerCadastrado });
    return novoProduto;
  }
}
