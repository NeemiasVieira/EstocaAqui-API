import { Injectable, HttpException, Logger } from '@nestjs/common';
import { Fornecedor } from './modules/fornecedor/fornecedor.model';
import { Usuario } from './modules/usuario/usuario.model';
import { Produto } from './modules/produto/produto.model';
import { CreateEntradaDto } from './modules/entrada/use-cases/create-entrada/create-entrada.dto';
import { Entrada } from './modules/entrada/entradas.model';
import { CreateSaidaDto } from './modules/saida/use-cases/create-saida/create-saida.dto';
import { UpdateEntradaDto } from './modules/entrada/use-cases/update-entrada/update-entrada.dto';
import { Saida } from './modules/saida/saida.model';

@Injectable()
export class AppService {
  private readonly logger = new Logger('AppService');

  constructor() {}

  async verificaFornecedor(id_fornecedor: number, id_grupo: number): Promise<Fornecedor> {
    const forncedorEncontrado = await Fornecedor.findOne({
      where: { id: id_fornecedor },
    });

    if (!forncedorEncontrado) {
      this.logger.error(`404 - Fornecedor ${id_fornecedor} não encontrado`);
      throw new HttpException(`Fornecedor ${id_fornecedor} não encontrado`, 404);
    }

    const usuarioQueCriouOFornecedor = await Usuario.findOne({
      where: { id: forncedorEncontrado.id_usuario },
    });

    if (usuarioQueCriouOFornecedor.id_grupo != id_grupo) {
      this.logger.error(`401 - Usuário sem permissão para o Fornecedor ${id_fornecedor}`);
      throw new HttpException(`Usuário sem permissão para o Fornecedor ${id_fornecedor}`, 401);
    }
    return forncedorEncontrado;
  }

  async verificaProdutos(objetoComAListaDeProdutos: CreateEntradaDto | CreateSaidaDto, id_grupo: number): Promise<boolean> {
    for (const item of objetoComAListaDeProdutos.item) {
      const produto = await Produto.findOne({ where: { id: item.id_produto } });

      if (!produto) {
        this.logger.error(`404 - Produto ${item.id_produto} não encontrado`);
        throw new HttpException(`Produto ${item.id_produto} não encontrado`, 404);
      }

      const id_usuarioQueCriouOProduto = produto.id_usuario;
      const usuarioQueCriouOProduto = await Usuario.findOne({
        where: { id: id_usuarioQueCriouOProduto },
      });

      if (usuarioQueCriouOProduto.id_grupo != id_grupo) {
        this.logger.error(`401 - Usuário sem autorização para o Produto ${item.id_produto}`);
        throw new HttpException(`Usuário sem autorização para o Produto ${item.id_produto}`, 401);
      }
      return true;
    }
  }

  async somaProdutos(entrada: CreateEntradaDto | UpdateEntradaDto | Entrada) {
    let produto: Produto;
    for (const item of entrada.item) {
      produto = await Produto.findOne({ where: { id: item.id_produto } });
      produto.quantidade += item.quantidade;
      await produto.save();
    }
  }

  async subtraiProdutos(saida: CreateSaidaDto | Saida, reverso = false) {
    let produto: Produto;

    for (const item of saida.item) {
      produto = await Produto.findOne({ where: { id: item.id_produto } });

      if (reverso) produto.quantidade += item.quantidade;
      if (!reverso) produto.quantidade -= item.quantidade;

      await produto.save();
    }
  }

  async verificaEntrada(entrada: Entrada | Saida, id_grupo: number): Promise<boolean> {
    const usuarioQueCriouAEntrada = await Usuario.findOne({
      where: { id: entrada.id_usuario },
    });

    if (id_grupo != usuarioQueCriouAEntrada.id_grupo) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    return true;
  }

  async verificaPermissão(objetoDeComparacao: Entrada | Fornecedor | Produto, id_grupo: number, permissaoUsuario?: string, somenteAdmin?: boolean) {
    const usuario = await Usuario.findOne({
      where: { id: objetoDeComparacao.id_usuario },
    });

    if (!usuario) {
      this.logger.error('404 - Usuário não encontrado');
      throw new HttpException('Usuário não encontrado', 404);
    }

    if (usuario.id_grupo != Number(id_grupo)) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    if (somenteAdmin && permissaoUsuario != 'admin') {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    return true;
  }

  async comparaPermissao(id_usuario: number, id_grupo: number): Promise<boolean> {
    const usuario = await Usuario.findOne({ where: { id: id_usuario } });

    if (usuario.id_grupo != Number(id_grupo)) {
      return false;
    }

    return true;
  }
}
