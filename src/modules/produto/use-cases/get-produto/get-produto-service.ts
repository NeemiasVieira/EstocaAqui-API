import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Produto } from '../../produto.model';

@Injectable()
export class GetProdutoService {
  private readonly logger = new Logger('GetProdutoService');

  async getProduto(idUsuario: number, idProduto: number): Promise<object> {
    this.logger.log(
      idProduto ? `Buscando produto pelo id` : `Buscando todos os produtos`,
    );

    if (idProduto) {
      const produto = await Produto.findOne({
        where: { id: idProduto, idUsuario: idUsuario },
      });

      if (!produto) {
        this.logger.error('404 - Produto não encontrado');
        throw new HttpException('Produto não encontrado', 404);
      }

      this.logger.verbose('201 - Produto encontrado');
      return {
        mensagem: 'Produto encontrado',
        produto: produto,
      };
    }

    const todosProdutosUsuario = await Produto.findAll({
      where: { idUsuario: idUsuario },
    });

    this.logger.verbose('201 - Produtos encontrados');
    return {
      mensagem: 'Produtos encontrados',
      produto: todosProdutosUsuario,
    };
  }
}
