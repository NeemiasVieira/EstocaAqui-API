import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Produto } from '../../produto.model';
import { AppService } from 'src/app.service';

@Injectable()
export class DeleteProdutoService {
  private readonly logger = new Logger('DeleteProdutoService');

  constructor(private readonly appService: AppService){}

  async deleteProduto(id_usuario: number, idProduto: number, id_grupo: string) {
    this.logger.log(`Requisição de exclusão do produto id nº: ${idProduto}`);
    const produtoASerExcluido = await Produto.findOne({
      where: { id: idProduto, id_usuario: id_usuario },
    });

    if (!produtoASerExcluido) {
      this.logger.error('404 - Produto não existe');
      throw new HttpException('Produto não existe', 404);
    }

    await this.appService.verificaPermissão(produtoASerExcluido, id_grupo);

    await Produto.destroy({
      where: { id: idProduto, id_usuario: id_usuario },
    });
    this.logger.log('200 - Produto excluído com sucesso');
  }
}
