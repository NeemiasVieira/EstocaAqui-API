import { HttpException, Injectable } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class DeleteUsuarioService {
  async DeleteUsuario(id: string) {
    const usuarioExiste = await Usuario.findOne({ where: { id } });

    if (!usuarioExiste) throw new HttpException('Usuário não encontrado', 404);

    await Usuario.destroy({ where: { id } });
  }
}
