import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUsuarioService } from './update-usuario.service';
import { UpdateUsuarioDto } from './update-usuario.dto';
import { Usuario } from '../../usuario.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('update-usuario')
@ApiTags("Usuario")
export class UpdateUsuarioController {
    constructor(private readonly appservice : UpdateUsuarioService){}

    @Patch("/:id")
    @ApiOperation({summary: "Atualiza o usuário"})
    @ApiResponse({status: 200, description: "Atualização realizada com sucesso"})
    @ApiResponse({status: 404, description: "Usuário não encontrado"})
    async updateUsuario(@Param("id") id : string, @Body() usuarioAtualizado : UpdateUsuarioDto) : Promise<Usuario>{
        
        return await this.appservice.updateUsuario(id, usuarioAtualizado);
    }
}
