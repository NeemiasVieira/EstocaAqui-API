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
  @ApiOperation({ summary: 'Busca produto(s) cadastrado(s) pelo usuário' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o(s) produto(s) encontrado(s)',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao listar o(s) produto(s)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProduto(
    @Request() requisicao: any,
    @Query('id') idProduto: number,
    @Query('ordenarPor') ordenarPor: string,
    @Query('cor') cor: string,
  ): Promise<object> {

    const id_grupo = requisicao.token.grupo.id;

    const resposta = await this.appserivce.getProduto(id_grupo, idProduto, ordenarPor, cor);
    return resposta;
  }
}
