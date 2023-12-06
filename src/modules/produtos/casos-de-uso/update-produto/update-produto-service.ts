import { HttpException, Injectable } from '@nestjs/common';
import { UpdateProdutoDto } from './update-produto-dto';
import { Produto } from '../../produto.model';

@Injectable()
export class UpdateProdutoService {
  async updateProduto(
    idUsuario: number,
    idProduto: number,
    novosDadosDoProduto: UpdateProdutoDto,
  ): Promise<object> {
    const produtoASerAtualizado = await Produto.findOne({
      where: { id: idProduto },
    });

    if (!produtoASerAtualizado)
      throw new HttpException('Produto não encontrado', 404);

    if (produtoASerAtualizado.idUsuario !== +idUsuario)
      throw new HttpException('Usuário não autorizado', 401);

    Object.keys(novosDadosDoProduto).forEach((propriedade) => {
      if (novosDadosDoProduto[propriedade]) {
        produtoASerAtualizado[propriedade] = novosDadosDoProduto[propriedade];
      }
    });

    await produtoASerAtualizado.save();

    return {
      mensagem: 'Produto atualizado com sucesso',
      produto: produtoASerAtualizado,
    };
  }
}
