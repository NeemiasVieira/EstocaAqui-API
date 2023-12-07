import { Injectable, Logger } from '@nestjs/common';
import { compare } from "bcrypt"
import { Usuario } from '../../usuario.model';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from './login-dto';

@Injectable()
export class LoginService {

    private readonly logger = new Logger("LoginService")

    constructor(private jwtService: JwtService) {}

    async login({ email, senha }: LoginUsuarioDto) {

        this.logger.log(`Tentativa de login de ${email}`);

        const usuarioExiste = await Usuario.findOne({ where: { email } });

        if (!usuarioExiste){
            this.logger.error("401 - Usuário ou senha incorretos");
            throw new HttpException("Usuário ou senha incorretos", 401);
        } 

        const usuarioNoBanco = usuarioExiste;
        const senhaEstaCorreta = await compare(senha, usuarioNoBanco.senha);

        if (!senhaEstaCorreta) {
            this.logger.error("401 - Usuário ou senha incorretos");
            throw new HttpException("Usuário ou senha incorretos", 401);
        } 

        //No token é armazenado o ID do usuário para usos futuros da aplicação
        const token = this.jwtService.sign({}, { secret: process.env.JWT_SECRET, subject: String(usuarioExiste.id) });

        const nomes = usuarioExiste.nome.split(" ");

        this.logger.verbose(`200 - Usuário ${email} autenticado.`)

        return {
            mensagem: `Usuário ${nomes[0]} autenticado com sucesso!`,
            usuario: usuarioNoBanco,
            token: token
        };
    }

}