import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Saida } from '../../saida.model';

@Injectable()
export class GetSaidaService {
  private readonly logger = new Logger('GetSaidaService');

  async getSaida(id_grupo: number, id_saida?: number): Promise<Saida[] | Saida> {
    if (id_saida) {
      this.logger.verbose(`200 - Busca da saída ${id_saida} realizada`);

      const saidaEncontrada = await Saida.findOne({ where: { id: id_saida } });

      const usuarioQueCriouASaida = await Usuario.findOne({
        where: { id: saidaEncontrada.id_usuario },
      });

      if (!saidaEncontrada) {
        this.logger.error('404 - Saída não encontrada');
        throw new HttpException('Saída não encontrada', 404);
      }

      if (usuarioQueCriouASaida.id_grupo != id_grupo) {
        this.logger.error('401 - Usuário não autorizado');
        throw new HttpException('Usuário não autorizado', 401);
      }

      return saidaEncontrada;
    }

    this.logger.verbose(`200 - Buscando todas as saídas`);

    const usuariosDoMesmoGrupo = await Usuario.findAll({
      where: { id_grupo: id_grupo },
    });

    const idsDeTodosOsUsuariosDoMesmoGrupo = usuariosDoMesmoGrupo.map(
      (usuario) => String(usuario.id), //Não tirar esse string, sei lá porque mas o sequelize precisa
    );

    return await Saida.findAll({
      where: { id_usuario: idsDeTodosOsUsuariosDoMesmoGrupo },
    });
  }
}
