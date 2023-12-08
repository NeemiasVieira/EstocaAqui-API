import { Injectable, Logger, HttpException} from '@nestjs/common';
import { CreateEntradaDto } from './create-entrada.dto';
import { Entrada } from '../../entradas.model';
import { Produto } from 'src/modules/produto/produto.model';
import { Fornecedor } from 'src/modules/fornecedor/fornecedor.model';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { AppService } from 'src/app.service';

@Injectable()
export class CreateEntradaService {

    constructor(private readonly appService: AppService){}

    private readonly logger = new Logger("CreateEntradaService");

    async CreateEntrada(id_usuario: string, entrada: CreateEntradaDto, id_grupo: string) : Promise<Entrada>{

        this.logger.log("Tentativa de criação de entrada");

        //Verifica se o fornecedor existe e se o usuário está no mesmo grupo de permissões

        await this.appService.verificaFornecedor(entrada.id_fornecedor, id_grupo);   

        //Verifica se cada produto existe e se o usuário está no mesmo grupo de permissões

        await this.appService.verificaProdutos(entrada, id_grupo);

        const novaEntrada = await Entrada.create({
            ...entrada,
            id_usuario
        })

        this.logger.verbose(`201 - Entrada criada com o ID ${novaEntrada.id}`);

        return novaEntrada;
    }
}
