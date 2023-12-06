import { Controller, Patch, UseGuards, Request, Body, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateGrupoService } from './update-grupo.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UpdateGrupoDto } from './update-grupo.dto';

@ApiTags("Grupos")
@Controller('update-grupo')
export class UpdateGrupoController {
    constructor(private readonly updateGrupoService : UpdateGrupoService){}

    @Patch('/:id')

    @ApiOperation({summary: "Atualiza o grupo"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiResponse({status: 200, description: "Grupo atualizado com sucesso!"})
    @ApiResponse({status: 401, description: "Usuário não autorizado a realizar esta operação"})
    @ApiResponse({status: 404, description: "Grupo não existe"})

    async updateGrupo(@Request() requisicao: any, @Body() grupoAtualizado: UpdateGrupoDto, @Param("id") id_grupo: string){
        const id_usuario = requisicao.user.subject;
        return await this.updateGrupoService.updateGrupo(id_usuario, id_grupo, grupoAtualizado);
    }

}
