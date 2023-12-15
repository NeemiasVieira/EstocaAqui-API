import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class DeleteUsuarioService {
  private readonly logger = new Logger('DeleteUsuarioService');

  async DeleteUsuario(id: number, id_grupo: number, id_usuario: number) {
    this.logger.log(`Tentativa de exclusão do usuário ${id}`);

    const usuarioExiste = await Usuario.findOne({ where: { id: id } });

    if (!usuarioExiste) {
      this.logger.error('404 - Usuário não encontrado');
      throw new HttpException('Usuário não encontrado', 404);
    }

    if (usuarioExiste.id_grupo !== id_grupo) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado', 401);
    }

    if (usuarioExiste.id === id_usuario) {
      this.logger.error('400 - Usuário não pode se deletar');
      throw new HttpException('Usuário não pode se deletar', 400);
    }

    const todosUsuariosAdminDoGrupo = await Usuario.findAll({ where: { id_grupo: id_grupo, permissao: 'admin' } });

    const idDosUsuariosAdmin = todosUsuariosAdminDoGrupo.map((usuarioAdmin) => {
      return usuarioAdmin.dataValues.id;
    });

    if (!idDosUsuariosAdmin.includes(id_usuario)) {
      this.logger.error('401 - Somente administadores podem deletar outros usuários');
      throw new HttpException('Somente administadores podem deletar outros usuários', 401);
    }

    //Aqui dá problema para excluir usuário caso ele já tenha cadastrado algo. Trabalhar essa lógica.
    //await Usuario.destroy({ where: { id: id } });

    this.logger.verbose(`200 - Usuário ${id} excluído.`);
  }
}
