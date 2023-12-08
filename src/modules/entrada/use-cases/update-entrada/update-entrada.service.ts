import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class UpdateEntradaService {

    constructor(private readonly appservice: AppService){}

    private readonly logger = new Logger("UpdateEntradaService");

    async updateEntrada(id_usuario: string, id_entrada: string, id_grupo: string, entradaAtualizada: UpdateEntradaDto) : Promise<Entrada>{

        this.logger.log(`Tentativa de atualização da entrada ${id_entrada}`)

        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        await this.appservice.verificaEntrada(entrada, id_grupo);

        Object.keys(entradaAtualizada).forEach((chave) => {
            if (entradaAtualizada[chave]) {
                entrada[chave] = entradaAtualizada[chave];
            }
        });

        await entrada.save();
        this.logger.verbose(`200 - Entrada ${id_entrada} atualizada com sucesso.`);

        return entrada;

    }
}
