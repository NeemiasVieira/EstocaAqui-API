import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProdutoService } from './create-produto-service';
import { CreateProdutoDto } from './create-produto-dto';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('produto')
@ApiTags('Produto')
export class CreateProdutoController {
  constructor(private readonly appserivce: CreateProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Retorna o novo usuário cadastrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar produto',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async criarProduto(
    @Request() requisicao: any,
    @Body() novoProduto: CreateProdutoDto,
  ): Promise<object> {
    const idUsuario = requisicao.user.subject;
    const resposta = await this.appserivce.createProduto(
      idUsuario,
      novoProduto,
    );
    return resposta;
  }
}
