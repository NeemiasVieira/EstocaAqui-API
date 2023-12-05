import { HttpException, Injectable, Logger} from '@nestjs/common';
import { Grupo } from '../../grupo.model';


@Injectable()
export class GetGrupoService {

    private readonly logger = new Logger('GetGrupoService');

    async getGrupo(id_grupo: string) : Promise<Grupo | Grupo[]>{
        this.logger.log(id_grupo ? `Buscando pelo ID ${id_grupo}` : "Buscando todos os grupos");

        if (id_grupo) {
            const grupo = await Grupo.findOne({where: {id: id_grupo}});

            if(!grupo) {
                this.logger.warn("Grupo não encontrado")
                throw new HttpException("Nenhum grupo encontrado", 404)
            }
            return grupo;
        }

        const grupos = await Grupo.findAll();
        return grupos;
    }
}
