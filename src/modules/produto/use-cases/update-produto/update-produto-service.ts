import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateProdutoDto } from './update-produto-dto';
import { Produto } from '../../produto.model';

@Injectable()
export class UpdateProdutoService {
  private readonly logger = new Logger('UpdateProdutoService');

  async updateProduto(
    idUsuario: number,
    idProduto: number,
    novosDadosDoProduto: UpdateProdutoDto,
  ): Promise<object> {
    this.logger.log('Atualizando produto');

    const produtoASerAtualizado = await Produto.findOne({
      where: { id: idProduto },
    });

    if (!produtoASerAtualizado) {
      this.logger.error('404 - Produto não encontrado');
      throw new HttpException('Produto não encontrado', 404);
    }

    if (produtoASerAtualizado.idUsuario !== +idUsuario) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    Object.keys(novosDadosDoProduto).forEach((propriedade) => {
      if (novosDadosDoProduto[propriedade]) {
        produtoASerAtualizado[propriedade] = novosDadosDoProduto[propriedade];
      }
    });

    await produtoASerAtualizado.save();
    this.logger.verbose('200 - Produto atualizado');

    return {
      mensagem: 'Produto atualizado com sucesso',
      produto: produtoASerAtualizado,
    };
  }
}
