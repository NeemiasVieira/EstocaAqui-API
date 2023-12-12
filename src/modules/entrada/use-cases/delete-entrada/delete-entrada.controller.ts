import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { DeleteEntradaService } from './delete-entrada.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('entrada')
@ApiTags('Entrada')
export class DeleteEntradaController {
  constructor(private readonly appservice: DeleteEntradaService) {}

  @ApiOperation({ summary: 'Exclusão de entrada' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário excluido com sucesso' })
  @ApiResponse({ status: 404, description: 'Entrada não encontrada' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteEntrada(@Param('id') id_entrada: string, @Request() requisicao: any) {
    const id_grupo: number = requisicao.token.grupo.id;

    await this.appservice.deleteEntrada(id_grupo, id_entrada);
  }
}
