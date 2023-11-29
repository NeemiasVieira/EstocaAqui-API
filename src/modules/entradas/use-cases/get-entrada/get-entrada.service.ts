import { Injectable } from '@nestjs/common';
import { Entrada } from '../../entradas.model';

@Injectable()
export class GetEntradaService {

    async getEntradas(id_usuario: string, id_entrada?: string) : Promise<Entrada | Entrada[]>{

        if(id_entrada){
            return await Entrada.findOne({where: {id: id_entrada, id_usuario}});
        }

        return await Entrada.findAll({where: {id_usuario}});
    }
}
