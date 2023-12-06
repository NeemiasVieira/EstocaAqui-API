import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './create-usuario-dto';
import { CreateUsuarioService } from './create-usuario-service';
import { Usuario } from '../../usuario.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario') //Anotação do Swagger para criar tag
@Controller() //Anotação do NestJS para informar que aqui é um controller
export class CreateUsuarioController {
  constructor(private readonly appserivce: CreateUsuarioService) {}

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
  // newUsuario é a variável que estamos criando e já informamos que ela será do tipo CreateUsuarioDTO
  // O Promise<Usuario> significa que o método register irá retornar uma promessa do tipo Usuario
  async register(@Body() novoUsuario: CreateUsuarioDto): Promise<Usuario> {
    //Dentro do método é criada a variável response, que justamente, será a resposta da requisição.
    //É feita a chamada assíncrona do método createUsuario, que é feita pelo appservice
    const resposta = await this.appserivce.createUsuario(novoUsuario);
    return resposta;
  }
}
