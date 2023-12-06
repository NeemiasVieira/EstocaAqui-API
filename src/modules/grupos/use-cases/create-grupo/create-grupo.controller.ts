import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { CreateGrupoDto } from './create-grupo.dto';
import { Grupo } from '../../grupo.model';
import { CreateGrupoService } from './create-grupo.service';

@Controller('create-grupo')
@ApiTags("Grupos")
export class CreateGrupoController {

    constructor(private readonly createGrupoService: CreateGrupoService){}

    @Post()
    @ApiOperation({summary: "Cria um grupo"})
    @ApiResponse({status: 201, description: "Grupo criado com sucesso!"})

    async createGrupo(@Body() novoGrupo : CreateGrupoDto) : Promise<Grupo>{
        return await this.createGrupoService.createGrupo(novoGrupo);
    }
}
