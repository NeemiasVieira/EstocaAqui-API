import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { CreateSaidaService } from './create-saida.service';
import { CreateSaidaDto } from './create-saida.dto';

@Controller('saida')
@ApiTags('Saida')
export class CreateSaidaController {
  constructor(private readonly appservice: CreateSaidaService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra uma nova saida' })
  @ApiResponse({ status: 201, description: 'Criação de uma nova saida ' })
  @UseGuards(AuthGuard)
  async CreateSaida(
    @Request() requisicao: any,
    @Body() saidaASerCriada: CreateSaidaDto,
  ): Promise<object> {
    const idUsuario = requisicao.token.usuario.id;
    const idGrupo = requisicao.token.grupo.id;
    const resposta = await this.appservice.createSaida(
      idUsuario,
      saidaASerCriada,
      idGrupo,
    );
    return resposta;
  }
}
