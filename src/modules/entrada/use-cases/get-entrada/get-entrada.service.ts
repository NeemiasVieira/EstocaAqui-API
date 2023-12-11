import { Injectable, Logger } from '@nestjs/common';
import { Entrada } from '../../entradas.model';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Op } from '@sequelize/core';
import { Grupo } from 'src/modules/grupo/grupo.model';

@Injectable()
export class GetEntradaService {

    private readonly logger = new Logger("GetEntradaService");

    async getEntradas(id_grupo: string, id_entrada?: string) : Promise<Entrada | Entrada[]>{

        const colaboradores = await Usuario.findAll({where: {id_grupo}});

        let ids_usuariosNogrupo = colaboradores.map(colaborador => String(colaborador.id)); 

        if(id_entrada){
            this.logger.verbose(`200 - Busca da entrada ${id_entrada} realizada`);
            return await Entrada.findOne({where: {id: id_entrada, id_usuario: {
                [Op.in]: ids_usuariosNogrupo
            }}});
        }

        this.logger.verbose("200 - Busca de entradas realizada");
        
        return await Entrada.findAll({
            where: {
                id_usuario: {
                    [Op.in]: ids_usuariosNogrupo
                }
            }
        });
    }
}
