import { Controller, Post, Body, Res} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './login-dto';
import { Response } from "express";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

@ApiTags("Usuarios")
@Controller('login')
export class LoginController {
    constructor(private readonly appservice: LoginService) { }

    @Post()
    @ApiOperation({summary: "Autenticação de usuário"})
    @ApiResponse({
        status: 200,
        description: 'Retorna uma mensagem de sucesso, o novo usuário e seu token de acesso',
    })
    @ApiResponse({
        status: 400,
        description: 'Usuário ou senha incorretos!',
    })
    async login(@Body() body: LoginUserDto, @Res() res : Response) {
        const { email, password } = body;
        const response = await this.appservice.login({ email, password });
        res.status(200).send(response);   
    }

}