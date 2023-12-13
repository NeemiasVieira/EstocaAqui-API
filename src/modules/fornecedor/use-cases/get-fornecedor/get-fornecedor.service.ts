import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Fornecedor } from '../../fornecedor.model';
import { Usuario } from 'src/modules/usuario/usuario.model';

@Injectable()
export class GetFornecedorService {
  private readonly logger = new Logger('GetFornecedorService');

  async getFornecedor(id_grupo: number, id_fornecedor?: number): Promise<Fornecedor | Fornecedor[]> {
    if (id_fornecedor) {
      this.logger.verbose(`200 - Busca pelo Fornecedor ${id_fornecedor}`);

      const fornecedorEncontrado = await Fornecedor.findOne({
        where: { id: id_fornecedor },
      });

      if (!fornecedorEncontrado) {
        this.logger.error('404 - Fornecedor não encontrado');
        throw new HttpException('Fornecedor não encontrado', 404);
      }

      const usuarioQueCriouOFornecedor = await Usuario.findOne({
        where: { id: fornecedorEncontrado.id_usuario },
      });

      if (usuarioQueCriouOFornecedor.id_grupo !== id_grupo) {
        this.logger.error('401 - Usuário não autorizado');
        throw new HttpException('Usuário não autorizado', 401);
      }
      return fornecedorEncontrado;
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
