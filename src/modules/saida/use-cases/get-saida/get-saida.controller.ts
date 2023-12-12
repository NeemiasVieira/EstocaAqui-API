import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { GetSaidaService } from './get-saida.service';
import { Saida } from '../../saida.model';

@Controller('saida')
@ApiTags('Saida')
export class GetSaidaController {
  constructor(private readonly appservice: GetSaidaService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Puxa a saída ou todas as saídas' })
  @ApiResponse({ status: 200, description: 'Retorna a saída ou todas as saídas'})
  @ApiResponse({ status: 401, description: "Usuário não autorizado"})
  @ApiResponse({ status: 404, description: "Saída não encontrada"})
  @UseGuards(AuthGuard)
  async CreateSaida(@Request() requisicao: any, @Query('id') id_saida: number): Promise<Saida[] | Saida> {
    const id_grupo: number = requisicao.token.usuario.id_grupo;
    return await this.appservice.getSaida(id_grupo, id_saida);
  }
}
