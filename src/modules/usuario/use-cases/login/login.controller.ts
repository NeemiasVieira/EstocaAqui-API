import { Controller, Post, Body, Res} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUsuarioDto } from './login-dto';
import { Response } from "express";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

@ApiTags("Usuario")
@Controller('usuario')
export class LoginController {
    constructor(private readonly appservice: LoginService) { }

    @Post("/login")
    @ApiOperation({summary: "Autenticação de usuário"})
    @ApiResponse({
        status: 200,
        description: 'Retorna uma mensagem de sucesso, o novo usuário e seu token de acesso',
    })
    @ApiResponse({
        status: 400,
        description: 'Usuário ou senha incorretos!',
    })
    async login(@Body() body: LoginUsuarioDto, @Res() res : Response) {
        const { email, senha } = body;
        const resposta = await this.appservice.login({ email, senha });
        res.status(200).send(resposta);   
    }

}