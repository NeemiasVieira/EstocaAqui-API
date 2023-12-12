import { Injectable, Logger } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UpdateSaidaDto } from './update-saida.dto';
import { Saida } from '../../saida.model';

@Injectable()
export class UpdateSaidaService {
  constructor(private readonly appservice: AppService) {}

  private readonly logger = new Logger('UpdateSaidaService');


    async updateSaida(id_saida: number, id_grupo: number, saidaAtualizada: UpdateSaidaDto) : Promise<Saida>{

        this.logger.log(`Tentativa de atualização da saida ${id_saida}`)


    const saida = await Saida.findOne({ where: { id: id_saida } });


        await this.appservice.verificaEntrada(saida, id_grupo);
        
        //Subtrai a quantidade anterior do estoque
        await this.appservice.subtraiProdutos(saida, true);


    Object.keys(saidaAtualizada).forEach((chave) => {
      if (saidaAtualizada[chave]) {
        saida[chave] = saidaAtualizada[chave];
      }
    });

    await saida.save();

    await this.appservice.subtraiProdutos(saida);

    this.logger.verbose(`200 - Saída ${id_saida} atualizada com sucesso.`);

    return saida;
  }
}
