import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Saida } from '../../saida.model';

@Injectable()
export class DeleteSaidaService {
  private readonly logger = new Logger('DeleteSaidaService');

  async deletaSaida(id_usuario: string, id_grupo: string, id_saida: string) {
    this.logger.log('Tentativa de exclusão de saída');

    const saida = Saida.findOne({ where: { id: id_saida } });
    if (!saida) {
      this.logger.error('404 - Saída não encontrada');
      throw new HttpException('Saída não encontrada', 404);
    }

    await Saida.destroy({
      where: { id: id_saida },
    });
    this.logger.log('200 - Saída excluída com sucesso');
  }
}
