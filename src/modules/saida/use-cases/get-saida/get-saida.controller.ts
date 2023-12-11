import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { GetSaidaService } from './get-saida.service';

@Controller('saida')
@ApiTags('Saida')
export class GetSaidaController {
  constructor(private readonly appservice: GetSaidaService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Puxa a saída ou todas as saídas' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a saída ou todas as saídas',
  })
  @UseGuards(AuthGuard)
  async CreateSaida(
    @Request() requisicao: any,
    @Query('id') id_saida: string,
  ): Promise<object> {
    const id_grupo = requisicao.token.usuario.id_grupo;
    const resposta = await this.appservice.getSaida(id_grupo, id_saida);
    return resposta;
  }
}
