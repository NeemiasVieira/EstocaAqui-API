import { Injectable } from '@nestjs/common';
import { compare } from "bcrypt"
import { User } from '../../user.model';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './login-dto';

@Injectable()
export class LoginService {

    constructor(private jwtService: JwtService) {}

    async login({ email, senha }: LoginUserDto) {
        const usuarioExiste = await User.findOne({ where: { email } });

        if (!usuarioExiste) throw new HttpException("Usuário ou senha incorretos", 400);

        const usuarioNoBanco = usuarioExiste;
        const senhaEstaCorreta = await compare(senha, usuarioNoBanco.senha);

        if (!senhaEstaCorreta) throw new HttpException("Usuário ou senha incorretos", 400);

        //No token é armazenado o ID do usuário para usos futuros da aplicação
        const token = this.jwtService.sign({}, { secret: process.env.JWT_SECRET, subject: String(usuarioExiste.id) });

        const nomes = usuarioExiste.nome.split(" ");

        return {
            mensagem: `Usuário ${nomes[0]} autenticado com sucesso!`,
            usuario: usuarioNoBanco,
            token: token
        };
    }

}