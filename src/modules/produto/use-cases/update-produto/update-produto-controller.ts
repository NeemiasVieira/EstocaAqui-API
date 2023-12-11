import {
  Body,
  Controller,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UpdateProdutoDto } from './update-produto-dto';
import { UpdateProdutoService } from './update-produto-service';

@Controller('produto')
@ApiTags('Produto')
export class updateProdutoController {
  constructor(private readonly appserivce: UpdateProdutoService) {}

  @Patch('/:id')
  @ApiOperation({ summary: 'Atualiza o produto selecionado' })
  @ApiResponse({
    status: 201,
    description: 'Atualiza um produto',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao atualizar o produto',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autorizado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateProduto(
    @Request() requisicao: any,
    @Param('id') idProduto: number,
    @Body() novosDadosDoProduto: UpdateProdutoDto,
  ): Promise<object> {
    const id_grupo = requisicao.token.grupo.id;
    const id_usuario = requisicao.token.usuario.id;
    
    const resposta = await this.appserivce.updateProduto(
      id_grupo,
      id_usuario,
      idProduto,
      novosDadosDoProduto,
    );

    return resposta;
  }
}
