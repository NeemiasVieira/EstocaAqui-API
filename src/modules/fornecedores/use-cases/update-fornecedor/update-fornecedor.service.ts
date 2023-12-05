import { HttpException, Injectable } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { UpdateFornecedorDto } from './update-fornecedor.dto';

@Injectable()
export class UpdateFornecedorService {

    async updateFornecedor(id_fornecedor: string, fornecedorAtualizado : UpdateFornecedorDto, id_usuario: string) : Promise<Fornecedor>{
        
        const fornecedor = await Fornecedor.findOne({where:{id: id_fornecedor}})

        if(!fornecedor) throw new HttpException('Fornecedor não encontrado!', 404);

        if(fornecedor.id_usuario != id_usuario) throw new HttpException('Acesso não autorizado!', 401)

        Object.keys(fornecedorAtualizado).forEach((chave) => {
            fornecedor[chave] = fornecedorAtualizado[chave];
        })

        await fornecedor.save();

        return fornecedor;

    }
}
