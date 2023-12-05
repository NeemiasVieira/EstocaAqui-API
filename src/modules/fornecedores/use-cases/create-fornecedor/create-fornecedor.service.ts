import { HttpException, Injectable } from '@nestjs/common';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { User } from 'src/modules/users/user.model';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class CreateFornecedorService {
    async CreateFornecedor(id_usuario: string, FornecedorDTO: CreateFornecedorDto) : Promise<Fornecedor>{

        const usuarioExiste = await User.findOne({where: {id: id_usuario}});
        if(!usuarioExiste) throw new HttpException("Usuário não existe", 400);

        const novoFornecedor = await Fornecedor.create({ ...FornecedorDTO, id_usuario });

        return novoFornecedor;
    }
}
