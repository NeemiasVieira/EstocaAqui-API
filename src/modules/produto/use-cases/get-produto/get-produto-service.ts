import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Produto } from '../../produto.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class GetProdutoService {
  private readonly logger = new Logger('GetProdutoService');

  async getProduto(id_grupo: number, idProduto: number, ordernarPor?: string, cor?: string): Promise<Produto[] | Produto> {
    this.logger.log(idProduto ? `Buscando produto pelo id ${idProduto}` : `Buscando todos os produtos`);

    const usuariosDoGrupo = await this.getUsuariosDoGrupo(id_grupo);

    let produtos: Produto[] | Produto;

    if (idProduto) {
      produtos = await this.getProdutoPorId(idProduto, usuariosDoGrupo);
    } else if (cor && !ordernarPor) {
      produtos = await this.getProdutosPorCor(cor, usuariosDoGrupo);
    }
    else if (!cor && !ordernarPor) {
      produtos = await this.getTodosProdutosUsuario(usuariosDoGrupo);
    }
    else {
      produtos = await this.getProdutosOrdenados(ordernarPor, usuariosDoGrupo, cor);
    }

    this.logger.verbose('200 - Produtos encontrados');
    return produtos;
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

  private async getProdutosOrdenados(ordernarPor: string, usuariosDoGrupo: Usuario[], cor?): Promise<Produto[]> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);

    let orderConfig: [string, 'ASC' | 'DESC'];

    switch (ordernarPor) {

      case 'quantidade-asc':
        orderConfig = ['quantidade', 'ASC'];
        break;
      case 'quantidade-dsc':
        orderConfig = ['quantidade', 'DESC'];
        break;
      case 'valor_de_compra-asc':
        orderConfig = ['valor_de_compra', 'ASC'];
        break;
      case 'valor_de_venda-asc':
        orderConfig = ['valor_de_venda', 'ASC'];
        break;
      case 'valor_de_venda-dsc':
        orderConfig = ['valor_de_venda', 'DESC'];
        break;
      case 'valor_de_compra-dsc':
        orderConfig = ['valor_de_compra', 'DESC'];
        break;
      default:
        this.logger.error("400 - Ordenação inválida");
        throw new HttpException('Ordenação inválida', 400);
    }

    console.log(orderConfig);

    return await Produto.findAll({
      where: {
        id_usuario: idsDosUsuariosDoGrupo,
        ...(cor ? { cor } : {}), // Adiciona o filtro por cor, se existir
      },
      order: [orderConfig, ['nome', 'ASC']], // Adiciona a ordenação padrão
    });
  }

  private async getTodosProdutosUsuario(usuariosDoGrupo: Usuario[]): Promise<Produto[]> {
    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);
    return await Produto.findAll({ where: { id_usuario: idsDosUsuariosDoGrupo }, order: [['nome', 'ASC']] });
  }
}
