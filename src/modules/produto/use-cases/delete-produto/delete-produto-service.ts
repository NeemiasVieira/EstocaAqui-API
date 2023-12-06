import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Produto } from '../../produto.model';

@Injectable()
export class DeleteProdutoService {
  private readonly logger = new Logger('DeleteProdutoService');

  async deleteProduto(idUsuario: number, idProduto: number) {
    this.logger.log(`Requisição de exclusão do produto id nº: ${idProduto}`);
    const produtoASerExcluido = await Produto.findOne({
      where: { id: idProduto, idUsuario: idUsuario },
    });

    if (!produtoASerExcluido) {
      this.logger.error('404 - Produto não existe');
      throw new HttpException('Produto não existe', 404);
    }

    if (produtoASerExcluido.idUsuario !== idUsuario) {
      this.logger.error('401 - Não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    await Produto.destroy({
      where: { id: idProduto, idUsuario: idUsuario },
    });
    this.logger.log('200 - Produto excluído com sucesso');
  }
}
