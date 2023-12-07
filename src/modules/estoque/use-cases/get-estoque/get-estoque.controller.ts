import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Estoque } from "../../estoque.model";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';
import { GetEstoqueService } from "./get-estoque.service";




@Controller('estoque')
@ApiTags("Estoque")
export class GetEstoqueController {

    constructor(private readonly appservice : GetEstoqueService ){}

    @Get()
    @ApiOperation({summary: "Lista um ou todos os produtos do estoque"})
    @ApiResponse({status:200, description: "Retorna um produto ou uma lista com todos os produtos do estoque"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getEstoque(@Query("id") id : string): Promise<Estoque | Estoque[]>{
        return await this.appservice.getEstoque(id);
    }
}