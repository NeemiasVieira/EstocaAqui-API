import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProdutoService } from './create-produto-service';
import { CreateProdutoDto } from './create-produto-dto';
import { Produto } from '../produto.model';

@ApiTags('Produtos')
@Controller()
export class CreateProdutoController {
  constructor(private readonly appserivce: CreateProdutoService) {}

  @Post('product')
  @ApiOperation({ summary: 'Cadastro de novo Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Retorna o novo usuário cadastrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário já existe',
  })
  async criarProduto(@Body() novoProduto: CreateProdutoDto): Promise<Produto> {
    const resposta = await this.appserivce.createProduto(novoProduto);
    return resposta;
  }
}
