import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Produto } from '../../produto.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class GetProdutoService {
  private readonly logger = new Logger('GetProdutoService');

  async getProduto(id_grupo: number, idProduto: number, ordernarPor?: string, cor?: string): Promise<object> {
    this.logger.log(idProduto ? `Buscando produto pelo id ${idProduto}` : `Buscando todos os produtos`);

    const usuariosDoGrupo = await this.getUsuariosDoGrupo(id_grupo);

    if (idProduto) {
      this.logger.log(`200 - Retornando busca pelo produto ${idProduto}`);
      return this.getProdutoPorId(idProduto, usuariosDoGrupo);
    }

    if (cor) {
      this.logger.log(`200 - Retornando busca por produtos da cor ${cor}`);
      return this.getProdutosPorCor(cor, usuariosDoGrupo);
    }

    if (ordernarPor) {
      this.logger.log(`200 - Retornando busca de produtos ordenada por ${ordernarPor}`);
      return this.getProdutosOrdenados(ordernarPor, usuariosDoGrupo);
    }

    const todosProdutosUsuario = await this.getTodosProdutosUsuario(usuariosDoGrupo);
    this.logger.verbose('200 - Produtos encontrados');
    return todosProdutosUsuario;
  }

  private async getUsuariosDoGrupo(id_grupo: number): Promise<Usuario[]> {
    return await Usuario.findAll({ where: { id_grupo } });
  }

  private async getProdutoPorId(idProduto: number, usuariosDoGrupo: Usuario[]): Promise<Produto> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);
    const produto = await Produto.findOne({
      where: {
        id: idProduto,
        id_usuario: idsDosUsuariosDoGrupo,
      },
    });

    if (!produto) {
      this.logger.error('404 - Produto não encontrado');
      throw new HttpException('Produto não encontrado', 404);
    }

    this.logger.verbose('200 - Produto encontrado');
    return produto;
  }

  private async getProdutosPorCor(cor: string, usuariosDoGrupo: Usuario[]): Promise<Produto[]> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);
    return await Produto.findAll({ where: { cor, id_usuario: idsDosUsuariosDoGrupo } });
  }

  private async getProdutosOrdenados(ordernarPor: string, usuariosDoGrupo: Usuario[]): Promise<Produto[]> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);

    let orderConfig;
    
    switch (ordernarPor) {
      case 'quantidade-asc':
        orderConfig = [['quantidade', 'ASC']];
        break;
      case 'quantidade-dsc':
        orderConfig = [['quantidade', 'DESC']];
        break;
      case 'valor_de_compra-asc':
        orderConfig = [['valor_de_compra', 'ASC']];
        break;
      case 'valor_de_venda-asc':
        orderConfig = [['valor_de_venda', 'ASC']];
        break;
      case 'valor_de_venda-dsc':
        orderConfig = [['valor_de_venda', 'DESC']];
        break;
      case 'valor_de_compra-dsc':
        orderConfig = [['valor_de_compra', 'DESC']];
        break;
      default:
        throw new HttpException('Ordenação inválida', 400);
    }

    return await Produto.findAll({
      where: {
        id_usuario: idsDosUsuariosDoGrupo,
      },
      order: orderConfig,
    });
  }

  private async getTodosProdutosUsuario(usuariosDoGrupo: Usuario[]): Promise<Produto[]> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);
    return await Produto.findAll({ where: { id_usuario: idsDosUsuariosDoGrupo, }, order: [['nome', 'ASC']] });
  }
}
