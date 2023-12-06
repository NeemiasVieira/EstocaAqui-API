import { Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class GetFornecedorService {

    private readonly logger = new Logger("GetFornecedorService");
    
    async getFornecedor(id_fornecedor: string): Promise<Fornecedor | Fornecedor[]> {

        if (id_fornecedor){
            this.logger.verbose(`200 - Busca pelo Fornecedor ${id_fornecedor}`)
            const fornecedor = await Fornecedor.findOne({ where: {id_fornecedor} });
            return fornecedor;
        }

        this.logger.verbose("200 - Busca por fornecedores");
        return await Fornecedor.findAll();
    }
}