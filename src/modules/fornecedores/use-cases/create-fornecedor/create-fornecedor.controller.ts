import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateFornecedorService } from './create-fornecedor.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Fornecedor } from '../../fornecedor.model';
import { CreateFornecedorDto } from './create-fornecedor.dto';

@ApiTags("Fornecedor")
@ApiBearerAuth()
@Controller('create-fornecedor')
export class CreateFornecedorController {
    constructor(private readonly createFornecedorService : CreateFornecedorService){}
    
    @Post()
    @ApiOperation({summary: "Cadastro de novo fornecedor"})
    @ApiResponse({status: 201, description: "Fornecedor criado com sucesso"})
    @ApiResponse({status: 400, description:"Bad request"})
    async CriarFornecedor(@Body() body : CreateFornecedorDto, @Request() requisicao: any) : Promise<Fornecedor>{
        const id_usuario = Number(requisicao.user.subject);
        return await this.createFornecedorService.CreateFornecedor(String(id_usuario), body);
    }
}
