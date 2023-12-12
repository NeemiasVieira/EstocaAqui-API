import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { UpdateFornecedorDto } from './update-fornecedor.dto';

@Injectable()
export class UpdateFornecedorService {
  private readonly logger = new Logger('UpdateFornecedorService');

  async updateFornecedor(
    id_fornecedor: number,
    fornecedorAtualizado: UpdateFornecedorDto,
    id_usuario: number,
  ): Promise<Fornecedor> {
    this.logger.log(`Tentativa de atualização do fornecedor ${id_fornecedor}`);
    const fornecedor = await Fornecedor.findOne({
      where: { id: id_fornecedor },
    });

    if (!fornecedor) {
      this.logger.error('404 - Fornecedor não encontrado');
      throw new HttpException('Fornecedor não encontrado!', 404);
    }

    if (fornecedor.id_usuario != id_usuario) {
      this.logger.error('401 - Usuário não autorizado');
      throw new HttpException('Usuário não autorizado!', 401);
    }

    Object.keys(fornecedorAtualizado).forEach((chave) => {
      fornecedor[chave] = fornecedorAtualizado[chave];
    });

    await fornecedor.save();
    this.logger.verbose(`200 - Fornecedor ${id_fornecedor} atualizado.`);

    return fornecedor;
  }
}
