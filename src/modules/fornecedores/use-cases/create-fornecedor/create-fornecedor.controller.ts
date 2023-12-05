import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateFornecedorService } from './create-fornecedor.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Fornecedor } from '../../fornecedor.model';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@ApiTags("Fornecedores")
@ApiBearerAuth()
@Controller('create-fornecedor')
export class CreateFornecedorController {
    constructor(private readonly createFornecedorService : CreateFornecedorService){}
    
    @Post()
    @ApiOperation({summary: "Cadastro de novo fornecedor"})
    @ApiResponse({status: 201, description: "Fornecedor criado com sucesso"})
    @ApiResponse({status: 400, description:"Bad request"})
    @UseGuards(AuthGuard)
    async CriarFornecedor(@Body() body : CreateFornecedorDto, @Request() requisicao: any) : Promise<Fornecedor>{
        const id_usuario = requisicao.user.subject;
        return await this.createFornecedorService.CreateFornecedor(String(id_usuario), body);
    }
}
