import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './middlewares/auth-module/auth';

@Controller('valida-token')
@ApiTags('Globais')
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Informa se o token é válido' })
  @ApiResponse({
    status: 200,
    description: 'Retorna true se o token for válido',
  })
  @ApiResponse({
    status: 401,
    description: 'Retorna false se o token for inválido',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  validaToken() {
    return true;
  }
}
