import { Body, Controller, HttpException, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFornecedorService } from './update-fornecedor.service';
import { UpdateFornecedorDto } from './update-fornecedor.dto';
import { Fornecedor } from '../../fornecedor.model';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('update-fornecedor')
@ApiTags("Fornecedores")

export class UpdateFornecedorController {
    constructor(private readonly appservice : UpdateFornecedorService){}

    @Patch("/:id")
    @ApiOperation({summary: "Atualiza o fornecedor"})
    @ApiResponse({status: 200, description: "Atualização realizada com sucesso"})
    @ApiResponse({status: 404, description: "Fornecedor não encontrado"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async updateFornecedor(@Param("id") id_fornecedor: string, @Body()  fornecedorAtualizado: UpdateFornecedorDto, @Request() requisicao: any) : Promise<Fornecedor>{
        const id_usuario = requisicao.user.subject
        
        const fornecedor = await Fornecedor.findOne({where:{id: id_fornecedor}})

        if(!fornecedor) throw new HttpException('Fornecedor não encontrado!', 404);

        if(fornecedor.id_usuario != id_usuario) throw new HttpException('Acesso não autorizado!', 401)
         
        return await this.appservice.updateFornecedor(id_fornecedor, fornecedorAtualizado)
    }
}