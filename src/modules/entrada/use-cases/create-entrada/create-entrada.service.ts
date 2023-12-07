import { Injectable, Logger } from '@nestjs/common';
import { CreateEntradaDto } from './create-entrada.dto';
import { Entrada } from '../../entradas.model';

@Injectable()
export class CreateEntradaService {

    private readonly logger = new Logger("CreateEntradaService");

    async CreateEntrada(id_usuario: string, entrada: CreateEntradaDto) : Promise<Entrada>{

        this.logger.log("Tentativa de criação de entrada");

        const novaEntrada = await Entrada.create({
            ...entrada,
            id_usuario
        })

        this.logger.verbose(`201 - Entrada criada com o ID ${novaEntrada.id}`);

        return novaEntrada;
    }
}
