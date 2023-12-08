import { HttpException, Injectable, Logger} from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { AppService } from 'src/app.service';

@Injectable()
export class DeleteEntradaService {

    constructor(private readonly appservice: AppService){}

    private readonly logger = new Logger("DeleteEntradaService");

    async deleteEntrada(id_usuario: string, id_grupo: string, id_entrada: string){

        this.logger.log(`Tentativa de exclusão da entrada ${id_entrada}`);
        
        const entrada = await Entrada.findOne({where: {id: id_entrada}});

        await this.appservice.verificaEntrada(entrada, id_grupo);        

        this.logger.verbose(`200 - Exclusão da entrada ${id_entrada} realizada com sucesso!}`);

        await Entrada.destroy({where: {id: id_entrada}});

    }
}
