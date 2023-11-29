import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFornecedorService } from './update-fornecedor.service';
import { UpdateFornecedorDto } from './update-fornecedor.dto';
import { Fornecedor } from '../../fornecedor.model';

@Controller('update-fornecedor')
@ApiTags("Fornecedor")
export class UpdateFornecedorController {
    constructor(private readonly appservice : UpdateFornecedorService){}

    @Patch("/:id")
    @ApiOperation({summary: "Atualiza o fornecedor"})
    @ApiResponse({status: 200, description: "Atualização realizada com sucesso"})
    @ApiResponse({status: 404, description: "Fornecedor não encontrado"})
    async updateFornecedor(@Param("id") id: string, @Body() fornecedorAtualizado: UpdateFornecedorDto) : Promise<Fornecedor>{
        return await this.appservice.updateFornecedor(id, fornecedorAtualizado)
    }
}
