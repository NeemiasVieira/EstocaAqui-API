import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class GetEntradaService {
  private readonly logger = new Logger('GetEntradaService');

  async getEntradas(id_grupo: number, id_entrada?: number): Promise<Entrada | Entrada[]> {
    const colaboradores = await Usuario.findAll({ where: { id_grupo } });

    const ids_usuariosNogrupo = colaboradores.map((colaborador) => String(colaborador.id));

    if (id_entrada) {
      this.logger.verbose(`200 - Busca da entrada ${id_entrada} realizada`);
      const entradaEncontrada = await Entrada.findOne({
        where: {
          id: id_entrada,
          id_usuario: ids_usuariosNogrupo,
        },
      });
      if (!entradaEncontrada) {
        this.logger.error('404 - Não existe entrada com esse número de id');
        throw new HttpException('Não existe entrada com esse número de id', 404);
      } else {
        return entradaEncontrada;
      }
    }

    this.logger.verbose('200 - Busca de entradas realizada');

    return await Entrada.findAll({
      where: {
        id_usuario: ids_usuariosNogrupo,
      },
    });
  }
}
