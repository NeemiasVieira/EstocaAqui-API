import { HttpException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../produto.model';

@Injectable()
export class CreateProdutoService {
  async createProduto(novoProduto: CreateProdutoDto): Promise<Produto> {
    const usuarioJaExiste = await Produto.findOne({
      where: { email: novoUsuario.email },
    });

    if (usuarioJaExiste)
      throw new HttpException('Usuário já existe! Tente novamente', 400);

    const novoProduto = await User.create({ ...novoProduto });
    return novoProduto;
  }
}
