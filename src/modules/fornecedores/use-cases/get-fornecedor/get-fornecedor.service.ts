import { Injectable } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class GetFornecedorService {
    
    async getFornecedor(id: string): Promise<Fornecedor | Fornecedor[]> {
        if (id){
            const fornecedor = await Fornecedor.findOne({ where: {id} });
            return fornecedor;
        }
        return await Fornecedor.findAll();
    }
}