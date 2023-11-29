import { Injectable } from '@nestjs/common';
import { CreateEntradaDto } from './create-entrada.dto';
import { Entrada } from '../../entradas.model';

@Injectable()
export class CreateEntradaService {

    async CreateEntrada(id_usuario: string, entrada: CreateEntradaDto) : Promise<Entrada>{

        const novaEntrada = await Entrada.create({
            ...entrada,
            id_usuario
        })

        return novaEntrada;
    }
}
