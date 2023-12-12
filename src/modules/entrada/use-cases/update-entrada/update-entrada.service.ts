import { Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';
import { AppService } from 'src/app.service';
import { Produto } from 'src/modules/produto/produto.model';

@Injectable()
export class UpdateEntradaService {
  constructor(private readonly appservice: AppService) {}

  private readonly logger = new Logger('UpdateEntradaService');

  async updateEntrada(id_entrada: number, id_grupo: number, entradaAtualizada: UpdateEntradaDto): Promise<Entrada> {
    this.logger.log(`Tentativa de atualização da entrada ${id_entrada}`);

    const entrada = await Entrada.findOne({ where: { id: id_entrada } });

    await this.appservice.verificaEntrada(entrada, id_grupo);

    //Subtrai a quantidade anterior do estoque
    let produto: Produto;

    for (const item of entrada.item) {
      produto = await Produto.findOne({ where: { id: item.id_produto } });
      produto.quantidade -= item.quantidade;
      await produto.save();
    }

    Object.keys(entradaAtualizada).forEach((chave) => {
      if (entradaAtualizada[chave]) {
        entrada[chave] = entradaAtualizada[chave];
      }
    });

    await entrada.save();

    await this.appservice.somaProdutos(entrada);

    this.logger.verbose(`200 - Entrada ${id_entrada} atualizada com sucesso.`);

    return entrada;
  }
}
