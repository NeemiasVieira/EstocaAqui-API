import { Injectable } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class GetUsuarioService {
      
  async getUsuario(id: string): Promise<Usuario | Usuario[]> {
    if (id) {
      const usuario = await Usuario.findOne({ where: { id } });
      return usuario;
    }

    return await Usuario.findAll();
  }
}
