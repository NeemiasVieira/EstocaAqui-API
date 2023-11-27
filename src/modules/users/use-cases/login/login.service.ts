import { Injectable } from '@nestjs/common';
import { compare } from "bcrypt"
import { User } from '../../user.model';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './login-dto';

@Injectable()
export class LoginService {

    constructor(private jwtService: JwtService) {}

    async login({ email, password }: LoginUserDto) {
        const userExists = await User.findOne({ where: { email } });

        if (!userExists) throw new HttpException("User or password is incorrect", 400);

        const userOnDataBase = userExists;

        const passwordIsCorrect = await compare(password, userOnDataBase.password);
        if (!passwordIsCorrect) throw new HttpException("User or password is incorrect", 400);

        //No token é armazenado o ID do usuário para usos futuros da aplicação
        const token = this.jwtService.sign({}, { secret: process.env.JWT_SECRET, subject: String(userExists.id) });

        return {
            message: "Login success",
            user: userOnDataBase,
            token: token
        };
    }

}