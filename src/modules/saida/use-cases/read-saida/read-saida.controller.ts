import {
  Body,
  Controller,
  Get,
  Query,
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

@Controller('saida')
@ApiTags('Saida')
export class ReadSaidaController {
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
    @Query('id') idSaida: number,
  ): Promise<object> {
    const idUsuario = requisicao.token.usuario.id;
    const resposta = await this.appservice.createSaida(idUsuario, idSaida);
    return resposta;
  }
}
