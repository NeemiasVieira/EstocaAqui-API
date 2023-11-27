import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { CreateUserService } from './create-user-service';
import { User } from '../../user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller()
export class CreateUserController {
  constructor(private readonly appserivce: CreateUserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Cadastro de novo Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Retorna o novo usuário cadastrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário já existe',
  })
  async register(@Body() newUser: CreateUserDto): Promise<User> {
    const response = await this.appserivce.createUser(newUser);
    return response;
  }
}
