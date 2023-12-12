import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEntradaDto } from './create-entrada.dto';
import { Entrada } from '../../entradas.model';
import { CreateEntradaService } from './create-entrada.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('entrada')
@ApiTags('Entrada')
export class CreateEntradaController {
  constructor(private readonly appservice: CreateEntradaService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra uma nova entrada' })
  @ApiResponse({ status: 201, description: 'Criação de uma nova entrada ' })
  @UseGuards(AuthGuard)
  async CreateEntrada(@Request() requisicao: any, @Body() entrada: CreateEntradaDto): Promise<Entrada> {
    const id_usuario: number = requisicao.token.usuario.id;

    const id_grupo: number = requisicao.token.grupo.id;

    return await this.appservice.CreateEntrada(id_usuario, entrada, id_grupo);
  }
}
