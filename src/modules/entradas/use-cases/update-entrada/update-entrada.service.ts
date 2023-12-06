import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';

@Injectable()
export class UpdateEntradaService {

    private readonly logger = new Logger("UpdateEntradaService");

    async updateEntrada(id_usuario: string, id_entrada: string, entradaAtualizada: UpdateEntradaDto) : Promise<Entrada>{

        this.logger.log(`Tentativa de atualização da entrada ${id_entrada}`)

        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        if(!entrada) {
            this.logger.error("404 - Entrada não encontrada");
            throw new HttpException("Entrada não encontrada", 404);
        }

        if(entrada.id_usuario !== id_usuario){
            this.logger.error("401 - Usuário não autorizado");
            throw new HttpException("Usuário não autorizado", 401);
        }

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
