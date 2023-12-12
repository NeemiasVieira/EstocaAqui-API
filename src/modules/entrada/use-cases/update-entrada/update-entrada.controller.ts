import { Controller, Param, Patch, Request, Body, UseGuards } from '@nestjs/common';
import { UpdateEntradaService } from './update-entrada.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('entrada')
@ApiTags('Entrada')
export class UpdateEntradaController {
  constructor(private readonly appservice: UpdateEntradaService) {}

  @ApiOperation({ summary: 'Atualização de entrada' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário excluido com sucesso' })
  @ApiResponse({ status: 404, description: 'Entrada não encontrada' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateEntrada(@Request() requisicao: any, @Param('id') id_entrada: number, @Body() entradaAtualizada: UpdateEntradaDto): Promise<Entrada> {
    const id_grupo: number = requisicao.token.grupo.id;

    return await this.appservice.updateEntrada(id_entrada, id_grupo, entradaAtualizada);
  }
}
