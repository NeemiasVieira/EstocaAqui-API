import { Injectable, HttpException, Logger } from '@nestjs/common';
import { Fornecedor } from './modules/fornecedor/fornecedor.model';
import { Usuario } from './modules/usuario/usuario.model';
import { Produto } from './modules/produto/produto.model';
import { CreateEntradaDto } from './modules/entrada/use-cases/create-entrada/create-entrada.dto';
import { Entrada } from './modules/entrada/entradas.model';

@Injectable()
export class AppService {

  private readonly logger = new Logger("AppService")

  constructor() {}

  async verificaFornecedor(id_fornecedor: string, id_grupo: string) : Promise<boolean> {
    const fornecedor = await Fornecedor.findOne({where: {id: id_fornecedor}});

    if(!fornecedor){
        this.logger.error(`404 - Fornecedor ${id_fornecedor} não encontrado`);
        throw new HttpException(`Fornecedor ${id_fornecedor} não encontrado`, 404);
    }

    const usuarioQueCriouOFornecedor = await Usuario.findOne({where: {id: fornecedor.id_usuario}});

        if(String(usuarioQueCriouOFornecedor.id_grupo) != id_grupo ){
            this.logger.error(`401 - Usuário sem permissão para o Fornecedor ${id_fornecedor}`);
            throw new HttpException(`Usuário sem permissão para o Fornecedor ${id_fornecedor}`, 401);        
        }
    return true;
  }

  async verificaProdutos(entrada: CreateEntradaDto, id_grupo: string): Promise<boolean>{
    for (const item of entrada.item) {
        const produto = await Produto.findOne({ where: { id: item.id_produto } });

        if(!produto){
            this.logger.error(`404 - Produto ${item.id_produto} não encontrado`);
            throw new HttpException(`Produto ${item.id_produto} não encontrado`, 404);
        }

        const id_usuarioQueCriouOProduto = produto.idUsuario;
        const usuarioQueCriouOProduto = await Usuario.findOne({where: {id: id_usuarioQueCriouOProduto}});

        if (String(usuarioQueCriouOProduto.id_grupo) != id_grupo) {
            this.logger.error(`401 - Usuário sem autorização para o Produto ${item.id_produto}`);
            throw new HttpException(`Usuário sem autorização para o Produto ${item.id_produto}`, 401);
        }
        return true;
    }
  }

  async verificaEntrada(entrada: Entrada, id_grupo: string): Promise<boolean>{
    
    if(!entrada) {
        this.logger.error("404 - Entrada não encontrada");
        throw new HttpException("Entrada não encontrada", 404);
    }

    const usuarioQueCriouAEntrada = await Usuario.findOne({where: {id: entrada.id_usuario}});

    if(id_grupo != String(usuarioQueCriouAEntrada.id_grupo)) {
        this.logger.error("401 - Usuário não autorizado");
        throw new HttpException("Usuário não autorizado", 401);
    }

    return true;
  }

}
