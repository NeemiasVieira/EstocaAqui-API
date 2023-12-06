import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../../produto.model';

@Injectable()
export class CreateProdutoService {
  async createProduto(
    idUsuario: string,
    produtoASerCadastrado: CreateProdutoDto,
  ): Promise<object> {
    //Quais serão as regras para criação de produto?
    
      const novoProduto = await Produto.create({
        ...produtoASerCadastrado,
        idUsuario,
      });
      return {
        mensagem: 'Produto criado com sucesso',
        produto: novoProduto,
      };
  }
}
