import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../produto.model';

@Injectable()
export class GetProdutoService {
  async getProduto(idUsuario: string, idProduto: string): Promise<object> {
    //Quais serão as regras para criação de produto?

    try {
      if (idProduto) {
        const produto = await Produto.findOne({
          where: { id: idUsuario, idProduto },
        });
        return {
          mensagem: 'Produto encontrado',
          produto: produto,
        };
      }

      const todosProdutosUsuario = await Produto.findAll({
        where: { id: idUsuario },
      });
      return {
        mensagem: 'Produtos encontrados',
        produto: todosProdutosUsuario,
      };
    } catch (error) {
      return {
        mensagem: 'Erro ao listar',
        erro: error,
      };
    }
  }
}
