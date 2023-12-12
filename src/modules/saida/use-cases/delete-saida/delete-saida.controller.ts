import { Controller, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteSaidaService } from './delete-saida.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('saida')
@ApiTags('Saida')
export class DeleteSaidaController {
  constructor(private readonly appService: DeleteSaidaService) {}

  @ApiOperation({ summary: 'Exclusão de saída' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Saída excluida com sucesso' })
  @ApiResponse({ status: 404, description: 'Saída não encontrada' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteSaida(@Param('id') id_saida: number, @Request() requisicao: any) {
    const id_usuario: number = requisicao.token.usuario.id;
    const id_grupo: number = requisicao.token.grupo.id;

    return await this.appService.deletaSaida(id_usuario, id_grupo, id_saida);
  }
}
