import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteFornecedorService } from './delete-fornecedor.service';

@Controller('delete-fornecedor')
@ApiTags("Fornecedor")
export class DeleteFornecedorController {

    constructor(private readonly appservice : DeleteFornecedorService) {}

    @Delete('/:id')
    @ApiOperation({summary: "Exclusão de Usuário"})
    
      @ApiResponse({
          status: 200,
          description: 'Usuário Excluído com sucesso',
      })

      @ApiResponse({
          status: 404,
          description: 'Usuário não encontrado',
      })

      async deleteFornecedor (@Param('id')id: String){
        await this.appservice.DeleteFornecedor(id);

      }
}