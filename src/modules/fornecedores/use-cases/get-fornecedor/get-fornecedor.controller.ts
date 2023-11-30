import { Controller, Get, Query } from '@nestjs/common';
import { GetFornecedorService } from './get-fornecedor.service';
import { Fornecedor } from '../../fornecedor.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/modules/users/user.model';

@Controller('get-fornecedor')
@ApiTags("Fornecedores")
export class GetFornecedorController {

    constructor(private readonly appservice : GetFornecedorService ){}

    @Get()
    @ApiOperation({summary: "Lista um ou todos os fornecedores"})
    @ApiResponse({status:200, description: "Retorna um fornecedor ou uma lista com todos os fornecedores"})
    async getFornecedor(@Query("id") id : string) : Promise<Fornecedor | Fornecedor[]>{
        return await this.appservice.getFornecedor(id);
    }
}