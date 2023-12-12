import { Injectable, Logger, HttpException } from '@nestjs/common';
import { Grupo } from '../../grupo.model';
import { UpdateGrupoDto } from './update-grupo.dto';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class UpdateGrupoService {

    private readonly logger = new Logger("UpdateGrupoService");

    async updateGrupo(id_usuario: number, id_grupo: number, grupoAtualizado: UpdateGrupoDto) : Promise<Grupo>{

        this.logger.log(`Tentativa de atualização do grupo ${id_grupo}`)

        const grupo = await Grupo.findOne({where: {id: id_grupo}});
        const usuario = await Usuario.findOne({where: {id: id_usuario}});

        if(!grupo){
            this.logger.error("404 - Grupo não encontrado");
            throw new HttpException("Grupo não encontrado", 404);
        }

        if(usuario.permissao != "admin" || usuario.id_grupo != Number(id_grupo)){
            this.logger.error("401 - Usuário não autorizado");
            throw new HttpException("Usuário não autorizado", 401);
        }

        Object.keys(grupoAtualizado).forEach((chave) => {
            grupo[chave] = grupoAtualizado[chave];
        })
        
        await grupo.save();

        this.logger.verbose(`200 - Grupo ${id_grupo} atualizado com sucesso!`);

        return grupo;

    }
}
