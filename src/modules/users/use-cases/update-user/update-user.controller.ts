import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';
import { UpdateUserDto } from './update-user.dto';
import { User } from '../../user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('update-user')
@ApiTags("Usuarios")
export class UpdateUserController {
    constructor(private readonly appservice : UpdateUserService){}

    @Patch("/:id")
    @ApiOperation({summary: "Atualiza o usuário"})
    @ApiResponse({status: 200, description: "Atualização realizada com sucesso"})
    @ApiResponse({status: 404, description: "Usuário não encontrado"})
    async updateUser(@Param("id") id : string, @Body() usuarioAtualizado : UpdateUserDto) : Promise<User>{
        
        return await this.appservice.updateUser(id, usuarioAtualizado);
    }
}
