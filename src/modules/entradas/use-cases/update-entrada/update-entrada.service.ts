import { HttpException, Injectable } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { UpdateEntradaDto } from './update-entrada.dto';

@Injectable()
export class UpdateEntradaService {
    async updateEntrada(id_usuario: string, id_entrada: string, entradaAtualizada: UpdateEntradaDto) : Promise<Entrada>{
        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        if(!entrada) throw new HttpException("Entrada não encontrada", 404);

        if(entrada.id_usuario !== id_usuario) throw new HttpException("Usuário não autorizado", 401);

        Object.keys(entradaAtualizada).forEach((chave) => {
            if (entradaAtualizada[chave]) {
                entrada[chave] = entradaAtualizada[chave];
            }
        });

        await entrada.save();

        return entrada;

    }
}
