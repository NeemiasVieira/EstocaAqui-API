import { HttpException, Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './create-grupo.dto';
import { Grupo } from '../../grupo.model';

@Injectable()
export class CreateGrupoService {
    async createGrupo(grupo : CreateGrupoDto) : Promise<Grupo>{

        const cnpjJaCadastrado = await Grupo.findOne({where: {cnpj: grupo.cnpj}});

        if(cnpjJaCadastrado) throw new HttpException("CNPJ já cadastrado", 400);

        const novoGrupo = await Grupo.create({...grupo});
        
        return novoGrupo;
    }
}
