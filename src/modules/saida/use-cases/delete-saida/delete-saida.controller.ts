import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteSaidaService } from './delete-saida.service';

@Controller('saida')
@ApiTags('Saída')
export class DeleteSaidaController {
  constructor(private readonly appService: DeleteSaidaService) {}

  @Delete('/:id')
  async deleteSaida(@Param('id') id_saida: string, @Request() requisicao: any) {
    const id_usuario = requisicao.token.usuario.id;
    const id_grupo = requisicao.token.grupo.id;
    const resposta = await this.appService.deletaSaida();
    return resposta;
  }
}
