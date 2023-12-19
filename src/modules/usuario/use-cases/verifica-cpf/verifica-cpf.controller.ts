import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerificaCpfService } from './verifica-cpf.service';

@Controller('usuario')
@ApiTags("Usuario")
export class VerificaCpfController {

    constructor(private readonly verificaCpfService: VerificaCpfService){}

    @ApiResponse({status: 200, description: "Retorna true ou false de acordo com a verificação"})
    @ApiResponse({status: 400, description: "A Query cpf é obrigatória"})
    @ApiOperation({summary: "Verifica se o CPF já foi cadastrado no sistema"})
    @Get('verifica-cpf')
    async verificaCPF(@Query() query: {cpf: string}) : Promise<boolean>{
        
        const { cpf } = query;
        return await this.verificaCpfService.VerificaCPF(cpf);
    }
}
