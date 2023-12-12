import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class GetUsuarioService {

  private readonly logger = new Logger("GetUsuarioService")
      
  async getUsuario(id: number): Promise<Usuario | Usuario[]> {
    
    if (id) {
      this.logger.verbose(`200 - Busca pelo usuário ${id}`);
      const usuario = await Usuario.findOne({ where: { id } });
      return usuario;
    }
    this.logger.verbose("200 - Busca por todos os usuários");

    return await Usuario.findAll();
  }
}
