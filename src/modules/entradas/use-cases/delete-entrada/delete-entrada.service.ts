import { HttpException, Injectable } from '@nestjs/common';
import { Entrada } from '../../entradas.model';

@Injectable()
export class DeleteEntradaService {
    async deleteEntrada(id_usuario: string, id_entrada: string){
        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        if(!entrada) throw new HttpException("Entrada não encontrada", 404);

        if(entrada.id_usuario !== id_usuario) throw new HttpException("Usuário não autorizado", 401);

        await Entrada.destroy({where: {id: id_entrada}});

    }
}
