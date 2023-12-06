import { Injectable } from '@nestjs/common';
import { Produto } from '../produto.model';

@Injectable()
export class DeleteProdutoService {
  async deleteProduto(idUsuario: number, idProduto: number): Promise<object> {
    try {
      await Produto.destroy({
        where: { id: idProduto, idUsuario: idUsuario },
      });
      return {
        mensagem: 'Produto deletado',
      };
    } catch (error) {
      console.log(error);
      return {
        mensagem: 'Erro ao deletar',
        erro: error,
      };
    }
  }
}
