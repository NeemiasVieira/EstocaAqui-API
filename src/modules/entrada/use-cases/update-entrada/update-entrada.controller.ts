import { Controller, Param, Patch, Request, Body } from '@nestjs/common';
import { UpdateEntradaService } from './update-entrada.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';

@Controller('entrada')
@ApiTags("Entrada")
export class UpdateEntradaController {
    constructor(private readonly appservice: UpdateEntradaService){}

    @ApiOperation({summary: "Atualização de entrada"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "Usuário excluido com sucesso"})
    @ApiResponse({status: 404, description: "Entrada não encontrada"})
    @ApiResponse({status: 401, description: "Usuário não autorizado"})
    @Patch("/:id")
    
    async updateEntrada(@Request() requisicao: any, @Param("id") id_entrada: string,
    @Body() entradaAtualizada : UpdateEntradaDto) : Promise<Entrada>{

        const id_usuario = requisicao.token.usuario.id;

        return await this.appservice.updateEntrada(id_usuario, id_entrada, entradaAtualizada);
    }
    
}
