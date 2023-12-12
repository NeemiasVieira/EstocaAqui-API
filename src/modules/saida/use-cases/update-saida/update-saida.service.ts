import { Injectable, Logger } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UpdateSaidaDto } from './update-saida.dto';
import { Saida } from '../../saida.model';
import { Produto } from 'src/modules/produto/produto.model';

@Injectable()
export class UpdateSaidaService {
    constructor(private readonly appservice: AppService){}

    private readonly logger = new Logger("UpdateSaidaService");

    async updateSaida(id_saida: string, id_grupo: string, saidaAtualizada: UpdateSaidaDto) : Promise<Saida>{
        this.logger.log(`Tentativa de atualização da saida ${id_saida}`)

        const saida = await Saida.findOne({where: {id: id_saida}});

        await this.appservice.verificaEntrada(saida, id_grupo);

        //Subtrai a quantidade anterior do estoque
        let produto : Produto;

        for (const item of saida.item){
            produto = await Produto.findOne({where: {id: item.id_produto}});
            produto.quantidade += item.quantidade;
            await produto.save();
        }

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