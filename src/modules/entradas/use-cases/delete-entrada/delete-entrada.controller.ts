import { Controller, Delete, Param, Request } from '@nestjs/common';
import { DeleteEntradaService } from './delete-entrada.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('delete-entrada')
@ApiTags("Entradas")
export class DeleteEntradaController {
    constructor(private readonly appservice: DeleteEntradaService){}

    @ApiOperation({summary: "Exclusão de entrada"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "Usuário excluido com sucesso"})
    @ApiResponse({status: 404, description: "Entrada não encontrada"})
    @ApiResponse({status: 401, description: "Usuário não autorizado"})
    @Delete("/:id")
    async deleteEntrada(@Param("id") id_entrada: string, @Request() requisicao: any){

        const id_usuario = requisicao.user.subject;

        await this.appservice.deleteEntrada(id_usuario, id_entrada);

    }
}
