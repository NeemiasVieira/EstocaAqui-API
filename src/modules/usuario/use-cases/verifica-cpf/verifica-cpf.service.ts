import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../../usuario.model';

@Injectable()
export class VerificaCpfService {
    private readonly logger = new Logger("VerificaCpfService");

    async VerificaCPF(cpf: string) : Promise<boolean> {

        this.logger.log(`Busca do CPF: ${cpf} no sistema`);

        if(!cpf){
            this.logger.error("400 - A Query cpf é obrigatória");
            throw new HttpException("A uery cpf é obrigatória.", 400);
        }

        const usuario = await Usuario.findOne({where: {cpf}});

        if(usuario) return true;

        return false;
    }
}
