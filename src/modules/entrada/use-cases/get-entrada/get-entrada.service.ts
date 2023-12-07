import { Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';

@Injectable()
export class GetEntradaService {

    private readonly logger = new Logger("GetEntradaService");

    async getEntradas(id_usuario: string, id_entrada?: string) : Promise<Entrada | Entrada[]>{

        
        if(id_entrada){
            this.logger.verbose(`200 - Busca da entrada ${id_entrada} realizada`);
            return await Entrada.findOne({where: {id: id_entrada, id_usuario}});
        }

        this.logger.verbose("200 - Busca de entradas realizada");
        
        return await Entrada.findAll({where: {id_usuario}});
    }
}
