import { HttpException, Injectable } from '@nestjs/common';
import { Grupo } from '../../grupo.model';

@Injectable()
export class GetGrupoService {
    async getGrupo(id_grupo: string) : Promise<Grupo | Grupo[]>{

        if (id_grupo) {
            const grupo = await Grupo.findOne({where: {id: id_grupo}});
            if(!grupo) throw new HttpException("Nenhum grupo encontrado", 404);
            return grupo;
        }

        const grupos = await Grupo.findAll();
        return grupos;
    }
}
