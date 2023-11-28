import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { CreateUserService } from './create-user-service';
import { User } from '../../user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios') //Anotação do Swagger para criar tag
@Controller() //Anotação do NestJS para informar que aqui é um controller
export class CreateUserController {
  constructor(private readonly appserivce: CreateUserService) {}

  @Post('signup') //Anotação do NestJS. O 'signup" é a rota da API.
  //As três anotações abaixo são do Swagger, com um resumo do que a rota faz e as possíveis respostas
  @ApiOperation({ summary: 'Cadastro de novo Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Retorna o novo usuário cadastrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário já existe',
  })
  //Abaixo temos um método assíncrono (sempre que tem async, tem o await de onde estamos esperando a resposta para continuar a execução do código)
  //register é o método
  //@Body() significa que o parâmetro virá do corpo da requisição HTTP
  // newUser é a variável que estamos criando e já informamos que ela será do tipo CreateUserDTO
  // O Promise<User> significa que o método register irá retornar uma promessa do tipo User
  async register(@Body() novoUsuario: CreateUserDto): Promise<User> {
    //Dentro do método é criada a variável response, que justamente, será a resposta da requisição.
    //É feita a chamada assíncrona do método createUser, que é feita pelo appservice
    const resposta = await this.appserivce.createUser(novoUsuario);
    return resposta;
  }
}
