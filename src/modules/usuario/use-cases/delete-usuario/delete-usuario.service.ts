import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class DeleteUsuarioService {
  private readonly logger = new Logger("DeleteUsuarioService");

  async DeleteUsuario(id: number) {

    this.logger.log(`Tentativa de exclusão do usuário ${id}`);

    const usuarioExiste = await Usuario.findOne({ where: { id } });

    if (!usuarioExiste){
      this.logger.error("404 - Usuário não encontrado");
      throw new HttpException('Usuário não encontrado', 404);
    } 

    await Usuario.destroy({ where: { id } });
    
    this.logger.verbose(`200 - Usuário ${id} excluído.`);
  }
}
