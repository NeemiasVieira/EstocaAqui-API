import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGrupoDto } from './create-grupo.dto';
import { Grupo } from '../../grupo.model';
import { CreateGrupoService } from './create-grupo.service';

@Controller('grupo')
@ApiTags("Grupo")
export class CreateGrupoController {

    constructor(private readonly createGrupoService: CreateGrupoService){}

    @Post()
    @ApiOperation({summary: "Cria um grupo"})
    @ApiResponse({status: 201, description: "Grupo criado com sucesso!"})

    async createGrupo(@Body() novoGrupo : CreateGrupoDto) : Promise<Grupo>{
        return await this.createGrupoService.createGrupo(novoGrupo);
    }
}
