import { HttpException, Injectable, Logger} from '@nestjs/common';
import { Grupo } from '../../grupo.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class DeleteGrupoService {

    private readonly logger = new Logger("DeleteGrupoervice");

    async deleteGrupo(id_grupo: string, id_usuario: string){

        this.logger.log(`Requisição de exclusão do grupo ${id_grupo}`);

        const grupoASerExcluido = await Grupo.findOne({where: {id: id_grupo}});

        const usuario = await Usuario.findOne({where: {id: id_usuario}});

        if(!grupoASerExcluido){
            this.logger.error("404 - Grupo não existe");
            throw new HttpException("O grupo não existe", 404);
        }

        if(grupoASerExcluido.id != usuario.id_grupo || usuario.permissao !== "admin"){
            this.logger.error("401 - Não autorizado");
            throw new HttpException("Usuário não autorizado", 401)
        }

        await Grupo.destroy({where: {id: id_grupo}});
        this.logger.log(`Grupo ${id_grupo} excluído com sucesso!`);

    }

}
