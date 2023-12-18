import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerificaCpnjService } from './verifica-cpnj.service';

@Controller('grupo')
@ApiTags("Grupo")
export class VerificaCpnjController {

    constructor(private readonly verificaCnpjService: VerificaCpnjService){}

    @Get("verifica-cnpj")
    @ApiOperation({summary: "Verifica se o CNPJ já foi cadastrado no sistema"})
    @ApiResponse({status: 200, description: "Retorna true ou false"})
    @ApiResponse({status: 400, description: "Query cnpj é obrigatória"})
    @ApiQuery({type: "string"})
    async verificaCNPJ(@Query() query: { cnpj: string }) : Promise<boolean>{
        const { cnpj } = query;
        return await this.verificaCnpjService.verificaCNPJ(cnpj);
    }
}
