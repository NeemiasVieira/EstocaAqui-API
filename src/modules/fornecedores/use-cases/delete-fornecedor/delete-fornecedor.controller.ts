import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteFornecedorService } from './delete-fornecedor.service';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

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
      @ApiBearerAuth()
      @UseGuards(AuthGuard)
      async deleteFornecedor (@Param('id')id: String){
        await this.appservice.DeleteFornecedor(id);
      
      }
}