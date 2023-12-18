import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUsuarioService } from './delete-usuario.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@ApiTags('Usuario')
@Controller('usuario')
export class DeleteUsuarioController {
  constructor(private readonly appservice: DeleteUsuarioService) {}

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Exclusão de Usuário' })
  @ApiResponse({ status: 200, description: 'Usuário Excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async deleteUsuario(@Param('id') id: number, @Request() requisicao: any) {
    const id_grupo: number = requisicao.token.usuario.id_grupo;
    const id_usuario: number = requisicao.token.usuario.id;
    await this.appservice.DeleteUsuario(id, id_grupo, id_usuario);
  }
}
