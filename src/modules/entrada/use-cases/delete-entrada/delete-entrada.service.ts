import { HttpException, Injectable, Logger} from '@nestjs/common';
import { Entrada } from '../../entradas.model';

@Injectable()
export class DeleteEntradaService {

    private readonly logger = new Logger("DeleteEntradaService");

    async deleteEntrada(id_usuario: string, id_entrada: string){

        this.logger.log(`Tentativa de exclusão da entrada ${id_entrada}`);
        
        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        if(!entrada) {
            this.logger.error("404 - Entrada não encontrada");
            throw new HttpException("Entrada não encontrada", 404);
        }

        if(entrada.id_usuario !== id_usuario) {
            this.logger.error("401 - Usuário não autorizado");
            throw new HttpException("Usuário não autorizado", 401);
        }

        this.logger.verbose(`200 - Exclusão da entrada ${id_entrada} realizada com sucesso!}`);

        await Entrada.destroy({where: {id: id_entrada}});

    }
}
