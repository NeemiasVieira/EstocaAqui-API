import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { GetProdutoService } from './get-produto-service';

@Controller('produto')
@ApiTags('Produto')
export class GetProdutoController {
  constructor(private readonly appserivce: GetProdutoService) {}

  @Get()
  @ApiOperation({ summary: 'Busca produtos cadastrados pelo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Retorna todos os produtos',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao listar o(s) produto(s)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProduto(
    @Request() requisicao: any,
    @Query('id') idProduto: number,
  ): Promise<object> {
    const idUsuario = requisicao.user.subject;
    const resposta = await this.appserivce.getProduto(idUsuario, idProduto);
    return resposta;
  }
}
