import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Saida } from '../../saida.model';

@Injectable()
export class GetSaidaService {
  private readonly logger = new Logger('GetSaidaService');

  async getSaida(id_grupo: string, id_saida?: string): Promise<object> {
    if (id_saida) {
      this.logger.verbose(`200 - Busca da saída ${id_saida} realizada`);
      const saidaEncontrada = await Saida.findOne({ where: { id: id_saida } });
      return {
        message: 'Saída encontrada',
        dados: saidaEncontrada,
      };
    }

    this.logger.verbose(`200 - Buscando todas as saídas`);
    const usuariosDoMesmoGrupo = await Usuario.findAll({
      where: { id_grupo: id_grupo },
    });

    const idsDeTodosOsUsuariosDoMesmoGrupo = usuariosDoMesmoGrupo.map(
      (usuario) => String(usuario.id),
    );

    const saidasDoGrupo = await Saida.findAll({
      where: { id_usuario: idsDeTodosOsUsuariosDoMesmoGrupo },
    });

    return {
      message: 'Todas saídas encontradas',
      dados: saidasDoGrupo,
    };
  }
}
