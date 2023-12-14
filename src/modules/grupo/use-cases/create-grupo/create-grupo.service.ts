import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Grupo } from '../../grupo.model';
import { CreateUsuarioGrupoDto } from './create-grupo-usuario.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateGrupoService {
  private readonly logger = new Logger('CreateGrupoService');

  async createGrupo(dados: CreateUsuarioGrupoDto): Promise<{usuario: Usuario, grupo: Grupo}> {

    this.logger.log("Tentativa de cadastro duplo iniciada");

    const cnpjJaCadastrado = await Grupo.findOne({
      where: { cnpj: dados.grupo.cnpj },
    });

    if (cnpjJaCadastrado) {
      this.logger.error('400 - CNPJ Já cadastrado');
      throw new HttpException('CNPJ já cadastrado', 400);
    }

    const usuarioJaExiste = await Usuario.findOne({ where: { email: dados.usuario.email } });

    if (usuarioJaExiste){
      this.logger.error("400 - Usuário já existe");
      throw new HttpException("Usuário já existe! Tente novamente", 400);
    } 

    dados.usuario.senha = await hash(dados.usuario.senha, Number(process.env.PASSWORD_SALT));

    const novoGrupo = await Grupo.create({ ...dados.grupo });

    const novoUsuario = await Usuario.create({ ...dados.usuario, id_grupo: novoGrupo.id});


    this.logger.verbose(`Novo grupo criado com sucesso com CNPJ: ${dados.grupo.cnpj}`);
    this.logger.verbose(`Novo usuario criado com sucesso com e-mail: ${dados.usuario.email}`)

    return {
      usuario: novoUsuario,
      grupo: novoGrupo
    };
  }
}
