import { Body, Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UpdateUsuarioService } from './update-usuario.service';
import { UpdateUsuarioDto } from './update-usuario.dto';
import { Usuario } from '../../usuario.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('usuario')
@ApiTags('Usuario')
export class UpdateUsuarioController {
  constructor(private readonly appservice: UpdateUsuarioService) {}

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualiza o usuário' })
  @ApiResponse({ status: 200, description: 'Atualização realizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  async updateUsuario(@Param('id') id: number, @Body() usuarioAtualizado: UpdateUsuarioDto, @Request() requisicao: any): Promise<Usuario> {
    const id_usuario: number = requisicao.token.usuario.id;
    return await this.appservice.updateUsuario(id_usuario, id, usuarioAtualizado);
  }
}
