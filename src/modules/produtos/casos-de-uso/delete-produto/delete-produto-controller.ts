import { Controller, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { DeleteProdutoService } from './delete-produto-service';

@Controller('produto')
@ApiTags('Produtos')
export class DeleteProdutoController {
  constructor(private readonly appserivce: DeleteProdutoService) {}

  @Delete()
  @ApiOperation({ summary: 'Deleta o produto selecionado' })
  @ApiResponse({
    status: 201,
    description: 'Deleta um produto',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao deletar o produto',
  })
  @UseGuards(AuthGuard)
  async getProduto(
    @Request() requisicao: any,
    @Query('id') idProduto: number,
  ): Promise<object> {
    const idUsuario = requisicao.user.subject;
    const resposta = await this.appserivce.deleteProduto(idUsuario, idProduto);
    return resposta;
  }
}
