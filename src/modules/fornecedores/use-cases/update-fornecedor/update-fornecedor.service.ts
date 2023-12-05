import { HttpException, Injectable } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { UpdateFornecedorDto } from './update-fornecedor.dto';

@Injectable()
export class UpdateFornecedorService {

    async updateFornecedor(id: string, fornecedorAtualizado : UpdateFornecedorDto) : Promise<Fornecedor>{
        
        const fornecedor = await Fornecedor.findOne({where: {id}});

        if(!fornecedor) throw new HttpException("Fornecedor não encontrado", 404);

        const { razao_social, nome_fantasia, cnpj} = fornecedorAtualizado

        Object.keys(fornecedorAtualizado).forEach((chave) => {
            fornecedor[chave] = fornecedorAtualizado[chave];
        })

        await fornecedor.save();

        return fornecedor;

    }
}
