import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateFornecedorService } from './create-fornecedor.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Fornecedor } from '../../fornecedor.model';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@ApiTags('Fornecedor')
@ApiBearerAuth()
@Controller('fornecedor')
export class CreateFornecedorController {
  constructor(
    private readonly createFornecedorService: CreateFornecedorService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard)
  async CriarFornecedor(
    @Body() body: CreateFornecedorDto,
    @Request() requisicao: any,
  ): Promise<Fornecedor> {
    const id_usuario: number = requisicao.token.usuario.id;
    return await this.createFornecedorService.CreateFornecedor(
      id_usuario,
      body,
    );
  }
}
