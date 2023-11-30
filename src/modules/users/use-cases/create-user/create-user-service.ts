import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../../user.model';
import { CreateUserDto } from './create-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService {
  async createUser(novoUsuario: CreateUserDto): Promise<User> {

    const usuarioJaExiste = await User.findOne({ where: { email: novoUsuario.email } });

    if (usuarioJaExiste) throw new HttpException("Usuário já existe! Tente novamente", 400);

    novoUsuario.password = await hash(novoUsuario.password, Number(process.env.PASSWORD_SALT));

    const novoCliente = await User.create({ ...novoUsuario });
    return novoCliente;


  }
}