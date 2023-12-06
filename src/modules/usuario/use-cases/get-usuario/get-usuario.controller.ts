import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../../usuario.model';
import { GetUsuarioService } from './get-usuario.service';

@Controller('get-usuario')
@ApiTags("Usuarios")
export class GetUsuarioController {

    constructor(private readonly appservice : GetUsuarioService){}

    @Get()
    @ApiOperation({summary: "Lista um ou todos os usuários"})
    @ApiResponse({status: 200, description: "Retorna um usuário ou uma lista com todos os usuários"})
    async getUsuarios(@Query("id") id : string) : Promise<Usuario | Usuario[]> {
        return await this.appservice.getUsuario(id);
    }

}
