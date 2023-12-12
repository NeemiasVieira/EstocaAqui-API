import { Controller, Request, Param, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateSaidaService } from './update-saida.service';
import { Saida } from '../../saida.model';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { UpdateSaidaDto } from './update-saida.dto';

@Controller('saida')
export class UpdateSaidaController {
    constructor(private readonly updateSaidaService: UpdateSaidaService){}

    @ApiOperation({summary: "Atualização de Saída"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "Usuário excluido com sucesso"})
    @ApiResponse({status: 404, description: "Saída não encontrada"})
    @ApiResponse({status: 401, description: "Usuário não autorizado"})
    @Patch("/:id")
    @UseGuards(AuthGuard)
    async updateSaida(@Request() requisicao: any, @Param("id") id_saida: string,
    @Body() saidaAtualizada : UpdateSaidaDto) : Promise<Saida>{
        const id_grupo = requisicao.token.grupo.id;

        return await this.updateSaidaService.updateSaida(id_saida, id_grupo, saidaAtualizada);

    }
}
