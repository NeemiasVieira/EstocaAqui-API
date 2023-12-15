import { Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { AppService } from 'src/app.service';

@Injectable()
export class GetFornecedorService {
  private readonly logger = new Logger('GetFornecedorService');
  constructor(private readonly appService: AppService) {}
  async getFornecedor(id_grupo: number, id_fornecedor?: number): Promise<Fornecedor | Fornecedor[]> {
    if (id_fornecedor) {
      this.logger.verbose(`200 - Busca pelo Fornecedor ${id_fornecedor}`);
      return this.appService.verificaFornecedor(id_fornecedor, id_grupo);
    }

    this.logger.verbose('200 - Busca por todos os fornecedores');
    const usuariosDoMesmoGrupo = await Usuario.findAll({
      where: { id_grupo: id_grupo },
    });

    const idsDeTodosOsUsuariosDoMesmoGrupo = usuariosDoMesmoGrupo.map(
      (usuario) => String(usuario.id), //Não tirar esse string, sei lá porque mas o sequelize precisa
    );

    return await Fornecedor.findAll({
      where: { id_usuario: idsDeTodosOsUsuariosDoMesmoGrupo },
    });
  }
}
