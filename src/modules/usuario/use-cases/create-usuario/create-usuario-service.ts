import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuario.model';
import { CreateUsuarioDto } from './create-usuario-dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUsuarioService {

  private readonly logger = new Logger("CreateUsuarioService");

  async createUsuario(novoUsuario: CreateUsuarioDto): Promise<Usuario> {

    this.logger.log("Tentativa de cadastro de novo usuário");

    const usuarioJaExiste = await Usuario.findOne({ where: { email: novoUsuario.email } });

    if (usuarioJaExiste){
      this.logger.error("400 - Usuário já existe");
      throw new HttpException("Usuário já existe! Tente novamente", 400);
    } 

    novoUsuario.senha = await hash(novoUsuario.senha, Number(process.env.PASSWORD_SALT));

    const novoCliente = await Usuario.create({ ...novoUsuario });

    this.logger.verbose(`201 - Usuário cadastrado com o ID ${novoCliente.id}`);
    
    return novoCliente;


  }
}