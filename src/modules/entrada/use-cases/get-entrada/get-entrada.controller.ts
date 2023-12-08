import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { GetEntradaService } from './get-entrada.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
@ApiTags("Entrada")
@Controller('entrada')
export class GetEntradaController {
    constructor(private readonly appservice: GetEntradaService){}

    @Get()
    @ApiBearerAuth()
    @ApiOperation({summary: "Lista todas as entradas criadas pelo usuário"})
    @ApiResponse({status: 200, description: "Retorna uma listagem de entradas realizada por aquele usuário"})
    @UseGuards(AuthGuard)
    async CreateEntrada (@Query("id") id_entrada : string, @Request() requisicao: any) {

        const id_grupo = requisicao.token.grupo.id;
    
        return await this.appservice.getEntradas(id_grupo, id_entrada);
        
    }
}
