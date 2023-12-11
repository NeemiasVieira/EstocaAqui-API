import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Op } from '@sequelize/core';
import { Produto } from '../../produto.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class GetProdutoService {
  private readonly logger = new Logger('GetProdutoService');

  async getProduto(
    id_grupo: number,
    idProduto: number,
  ): Promise<object> {
    this.logger.log(
      idProduto
        ? `Buscando produto pelo id ${idProduto}`
        : `Buscando todos os produtos`,
    );

    const usuariosDoGrupo = await Usuario.findAll({ where: { id_grupo } });

    const idsDosUsuariosDoGrupo = usuariosDoGrupo.map((usuario) => usuario.id);

    if (idProduto) {
      const produto = await Produto.findOne({
        where: {
          id: idProduto,
          id_usuario: {
            [Op.in]: idsDosUsuariosDoGrupo,
          },
        },
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
      where: {
        id_usuario: {
          [Op.in]: idsDosUsuariosDoGrupo,
        },
      },
    });

    this.logger.verbose('201 - Produtos encontrados');
    return {
      mensagem: 'Produtos encontrados',
      produto: todosProdutosUsuario,
    };
  }
}
