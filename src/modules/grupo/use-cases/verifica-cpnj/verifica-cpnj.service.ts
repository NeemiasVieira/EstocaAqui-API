import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Grupo } from '../../grupo.model';

@Injectable()
export class VerificaCpnjService {
    private readonly logger = new Logger("VeirificaCnpjService");

    async verificaCNPJ(cnpj: string): Promise<boolean>{
        
        this.logger.log(`Buscando o CNPJ ${cnpj} no sistema`)
        
                if(!cnpj){
                    this.logger.error("400 - A Query cnpj é obrigatória");
                    throw new HttpException("A query cnpj é obrigatória", 400);                    
                }

        const grupo = await Grupo.findOne({where: {cnpj}});

        if(!grupo) return false;

        return true;
    }
}
