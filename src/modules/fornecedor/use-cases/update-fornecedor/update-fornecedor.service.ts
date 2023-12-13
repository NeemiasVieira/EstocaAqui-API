import { Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { UpdateFornecedorDto } from './update-fornecedor.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class UpdateFornecedorService {
  private readonly logger = new Logger('UpdateFornecedorService');
  constructor(private readonly appService: AppService) {}

  async updateFornecedor(id_fornecedor: number, fornecedorAtualizado: UpdateFornecedorDto, id_grupo: number): Promise<Fornecedor> {
    this.logger.log(`Tentativa de atualização do fornecedor ${id_fornecedor}`);

    const forncedorEncontrado = await this.appService.verificaFornecedor(id_fornecedor, id_grupo);

    Object.keys(fornecedorAtualizado).forEach((chave) => {
      forncedorEncontrado[chave] = fornecedorAtualizado[chave];
    });

    await forncedorEncontrado.save();
    this.logger.verbose(`200 - Fornecedor ${id_fornecedor} atualizado.`);

    return forncedorEncontrado;
  }
}
