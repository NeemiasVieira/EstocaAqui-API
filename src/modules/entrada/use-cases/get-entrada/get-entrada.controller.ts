import { Controller, Get, Query, Request } from '@nestjs/common';
import { GetEntradaService } from './get-entrada.service';
import { Entrada } from '../../entradas.model';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags("Entrada")
@Controller('entrada')
export class GetEntradaController {
    constructor(private readonly appservice: GetEntradaService){}

    @Get()
    @ApiBearerAuth()
    @ApiOperation({summary: "Lista todas as entradas criadas pelo usuário"})
    @ApiResponse({status: 200, description: "Retorna uma listagem de entradas realizada por aquele usuário"})
    async CreateEntrada (@Query("id") id_entrada : string, @Request() requisicao: any) : Promise<Entrada | Entrada[]>{

        const id_usuario = requisicao.token.usuario.id;
    
        return await this.appservice.getEntradas(id_usuario, id_entrada);
        
    }
}
