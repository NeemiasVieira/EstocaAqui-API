import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetFornecedorService } from './get-fornecedor.service';
import { Fornecedor } from '../../fornecedor.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/middlewares/auth-module/auth';

@Controller('fornecedor')
@ApiTags('Fornecedor')
export class GetFornecedorController {
  constructor(private readonly appservice: GetFornecedorService) {}

  @Get()
  @ApiOperation({ summary: 'Lista um ou todos os fornecedores' })
  @ApiResponse({
    status: 200,
    description: 'Retorna um fornecedor ou uma lista com todos os fornecedores',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getFornecedor(
    @Query('id') id_fornecedor: number,
  ): Promise<Fornecedor | Fornecedor[]> {
    return await this.appservice.getFornecedor(id_fornecedor);
  }
}
