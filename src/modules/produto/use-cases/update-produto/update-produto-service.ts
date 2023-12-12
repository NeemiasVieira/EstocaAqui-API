import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateProdutoDto } from './update-produto-dto';
import { Produto } from '../../produto.model';
import { AppService } from 'src/app.service';

@Injectable()
export class UpdateProdutoService {

  constructor(private readonly appService: AppService){}

  private readonly logger = new Logger('UpdateProdutoService');

  async updateProduto(
    id_grupo: number,
    id_usuario: number,
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

    if (!this.appService.comparaPermissao(produtoASerAtualizado.id_usuario, id_grupo)) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    Object.keys(novosDadosDoProduto).forEach((propriedade) => {
      if (novosDadosDoProduto[propriedade]) {
        produtoASerAtualizado[propriedade] = novosDadosDoProduto[propriedade];
      }
    });

    produtoASerAtualizado.id_usuario = id_usuario;

    await produtoASerAtualizado.save();
    this.logger.verbose('201 - Produto atualizado');

    return {
      mensagem: 'Produto atualizado com sucesso',
      produto: produtoASerAtualizado,
    };
  }
}
