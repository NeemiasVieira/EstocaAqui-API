import { HttpException, Injectable } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class DeleteFornecedorService {
    
    async DeleteFornecedor(id: String){

            const fornecedorExiste = await Fornecedor.findOne({where: {id}});
            
            if(!fornecedorExiste) throw new HttpException ('Fornecedor não encontrado', 404);

            await Fornecedor.destroy({where: {id}})
        }
}