import { Controller, Delete, Param, Request, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { DeleteGrupoService } from './delete-grupo.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('delete-grupo')
@ApiTags("Grupos")
export class DeleteGrupoController {

    constructor(private readonly deleteGrupoService: DeleteGrupoService){}

    @Delete("/:id")
    @ApiOperation({summary: "Exclusão de um grupo"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "Exclusão conclúida com sucesso"})
    @ApiResponse({status: 401, description: "Usuario não autorizado"})
    @ApiResponse({status: 404, description: "Grupo não encontrado"})
    @UseGuards(AuthGuard)

    async deleteGrupo(@Param("id") id_grupo: string, @Request() requisicao: any){
        const id_usuario = requisicao.user.subject;
        await this.deleteGrupoService.deleteGrupo(id_grupo, id_usuario);

    }
}
