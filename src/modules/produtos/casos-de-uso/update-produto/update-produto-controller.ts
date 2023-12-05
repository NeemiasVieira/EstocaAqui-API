import {
  Body,
  Controller,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UpdateProdutoDto } from './update-produto-dto';
import { UpdateProdutoService } from './update-produto-service';

@Controller('produto')
@ApiTags('Produtos')
export class updateProdutoController {
  constructor(private readonly appserivce: UpdateProdutoService) {}

  @Put()
  @ApiOperation({ summary: 'Atualiza o produto selecionado' })
  @ApiResponse({
    status: 201,
    description: 'Atualiza um produto',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar o produto',
  })
  @UseGuards(AuthGuard)
  async updateProduto(
    @Request() requisicao: any,
    @Query('id') idProduto: number,
    @Body() novosDadosDoProduto: UpdateProdutoDto,
  ): Promise<object> {
    const idUsuario = requisicao.user.subject;
    const resposta = await this.appserivce.updateProduto(
      idUsuario,
      idProduto,
      novosDadosDoProduto,
    );
    return resposta;
  }
}
