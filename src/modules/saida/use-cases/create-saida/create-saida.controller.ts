import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth,  ApiOperation,  ApiResponse,  ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { CreateSaidaService } from './create-saida.service';
import { CreateSaidaDto } from './create-saida.dto';
import { Saida } from '../../saida.model';

@Controller('saida')
@ApiTags('Saida')
export class CreateSaidaController {
  constructor(private readonly appservice: CreateSaidaService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra uma nova saida' })
  @ApiResponse({ status: 201, description: 'Criação de uma nova saida' })
  @UseGuards(AuthGuard)
  async CreateSaida(@Request() requisicao: any, @Body() saidaASerCriada: CreateSaidaDto): Promise<Saida> {

    const id_usuario = requisicao.token.usuario.id;
    const id_grupo = requisicao.token.grupo.id;

    return await this.appservice.createSaida( id_usuario, id_grupo, saidaASerCriada );
  }
}
