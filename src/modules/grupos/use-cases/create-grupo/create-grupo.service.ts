import { HttpException, Injectable, Logger} from '@nestjs/common';
import { CreateGrupoDto } from './create-grupo.dto';
import { Grupo } from '../../grupo.model';

@Injectable()
export class CreateGrupoService {

    private readonly logger = new Logger("CreateGrupoService")

    async createGrupo(grupo : CreateGrupoDto) : Promise<Grupo>{

        const cnpjJaCadastrado = await Grupo.findOne({where: {cnpj: grupo.cnpj}});

        if(cnpjJaCadastrado) {
            this.logger.error("400 - CNPJ Já cadastrado");
            throw new HttpException("CNPJ já cadastrado", 400);
        }

        const novoGrupo = await Grupo.create({...grupo});

        this.logger.log(`Novo grupo criado com sucesso com CNPJ: ${grupo.cnpj}`)

        return novoGrupo;
    }
}
