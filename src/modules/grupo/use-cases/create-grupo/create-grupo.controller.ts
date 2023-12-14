import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Grupo } from '../../grupo.model';
import { CreateGrupoService } from './create-grupo.service';
import { CreateUsuarioGrupoDto } from './create-grupo-usuario.dto';

@Controller('grupo')
@ApiTags('Grupo')
export class CreateGrupoController {
  constructor(private readonly createGrupoService: CreateGrupoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um grupo' })
  @ApiResponse({ status: 201, description: 'Grupo criado com sucesso!' })
  async createGrupo(@Body() novoGrupo: CreateUsuarioGrupoDto): Promise<{usuario: Usuario, grupo: Grupo}> {
    return await this.createGrupoService.createGrupo(novoGrupo);
  }
}
