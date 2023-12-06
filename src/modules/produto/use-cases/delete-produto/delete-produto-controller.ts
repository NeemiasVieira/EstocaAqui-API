import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { DeleteProdutoService } from './delete-produto-service';

@Controller('produto')
@ApiTags('Produto')
export class DeleteProdutoController {
  constructor(private readonly appserivce: DeleteProdutoService) {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta o produto selecionado' })
  @ApiResponse({
    status: 201,
    description: 'Deleta um produto',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao deletar o produto',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProduto(@Request() requisicao: any, @Param('id') idProduto: number) {
    const idUsuario = requisicao.user.subject;
    await this.appserivce.deleteProduto(idUsuario, idProduto);
  }
}
