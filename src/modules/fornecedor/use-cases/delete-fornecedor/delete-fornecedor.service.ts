import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class DeleteFornecedorService {
  private readonly logger = new Logger('DeleteFornecedorService');

  async DeleteFornecedor(id_fornecedor: number) {
    this.logger.log(`Tentativa de exclusão do fornecedor ${id_fornecedor}`);

    const fornecedorExiste = await Fornecedor.findOne({
      where: { id: id_fornecedor },
    });

    if (!fornecedorExiste) {
      this.logger.error('404 - Fornecedor não encontrado');
      throw new HttpException('Fornecedor não encontrado', 404);
    }

    this.logger.verbose(`Fornecedor ${id_fornecedor} excluído.`);

    await Fornecedor.destroy({ where: { id: id_fornecedor } });
  }
}
