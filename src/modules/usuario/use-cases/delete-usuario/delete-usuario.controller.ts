import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUsuarioService } from './delete-usuario.service';

@ApiTags('Usuario')
@Controller('delete-usuario')
export class DeleteUsuarioController {
  constructor(private readonly appservice: DeleteUsuarioService) {}

  @Delete('/:id')
  @ApiOperation({summary: "Exclusão de Usuário"})
    @ApiResponse({
        status: 200,
        description: 'Usuário Excluído com sucesso',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })

  async deleteUsuario(@Param('id') id: string) {
    await this.appservice.DeleteUsuario(id);
  }
}
