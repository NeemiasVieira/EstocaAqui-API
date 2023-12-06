import { Injectable, Logger } from '@nestjs/common';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../../produto.model';

@Injectable()
export class CreateProdutoService {
  private readonly logger = new Logger('CreateProdutoService');

  async createProduto(
    idUsuario: string,
    produtoASerCadastrado: CreateProdutoDto,
  ): Promise<object> {
    this.logger.log(`Criando novo produto: ${produtoASerCadastrado.nome}`);
    // Qual as regras de nogócio para criação de novo produto?
    const novoProduto = await Produto.create({
      ...produtoASerCadastrado,
      idUsuario,
    });
    this.logger.verbose(`Produto ${novoProduto.nome} criado com sucesso!`);
    return {
      mensagem: 'Produto criado com sucesso',
      produto: novoProduto,
    };
  }
}
