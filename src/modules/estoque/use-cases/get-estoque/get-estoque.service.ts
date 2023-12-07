import { Injectable, Logger } from '@nestjs/common';
import { Estoque } from '../../estoque.model';


@Injectable()
export class GetEstoqueService {

    private readonly logger = new Logger("GetEstoqueService");
    
    async getEstoque(id_estoque: string): Promise<Estoque | Estoque[]> {

        if (id_estoque){
            this.logger.verbose(`200 - Busca pelo Estoque ${id_estoque}`)
            const estoque = await Estoque.findOne({ where: {id_estoque} });
            return estoque;
        }

        this.logger.verbose("200 - Busca por estoque");
        return await Estoque.findAll();
    }
}