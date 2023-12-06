import { Controller, Get, Query} from '@nestjs/common';
import { GetGrupoService } from './get-grupo.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Grupo } from '../../grupo.model';

@Controller('get-grupo')
@ApiTags('Grupos')
export class GetGrupoController {

    constructor(private readonly getGrupoService : GetGrupoService){}

    @Get()
    @ApiOperation({summary: "Lista um ou todos os grupos"})
    @ApiResponse({status: 200, description: "Retorna um ou todos os grupos"})
    async getGrupo(@Query("id") id_grupo: string) : Promise<Grupo | Grupo[]>{

        return await this.getGrupoService.getGrupo(id_grupo);
    }
}
