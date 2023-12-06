import { HttpException, Injectable } from '@nestjs/common';
import { Usuario } from '../../usuario.model';
import { CreateUsuarioDto } from './create-usuario-dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUsuarioService {
  async createUsuario(novoUsuario: CreateUsuarioDto): Promise<Usuario> {

    const usuarioJaExiste = await Usuario.findOne({ where: { email: novoUsuario.email } });

    if (usuarioJaExiste) throw new HttpException("Usuário já existe! Tente novamente", 400);

    novoUsuario.senha = await hash(novoUsuario.senha, Number(process.env.PASSWORD_SALT));

    const novoCliente = await Usuario.create({ ...novoUsuario });
    return novoCliente;


  }
}