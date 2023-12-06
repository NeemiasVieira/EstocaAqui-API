import { Injectable } from '@nestjs/common';
import { Produto } from '../../produto.model';

@Injectable()
export class GetProdutoService {
  async getProduto(idUsuario: number, idProduto: number): Promise<object> {
    try {
      if (idProduto) {
        const produto = await Produto.findOne({
          where: { id: idProduto, idUsuario: idUsuario },
        });
        return {
          mensagem: 'Produto encontrado',
          produto: produto,
        };
      }

      const todosProdutosUsuario = await Produto.findAll({
        where: { idUsuario: idUsuario },
      });
      return {
        mensagem: 'Produtos encontrados',
        produto: todosProdutosUsuario,
      };
    } catch (error) {
      console.log(error);
      return {
        mensagem: 'Erro ao listar',
        erro: error,
      };
    }
  }
}
