import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Fornecedor } from '../../fornecedor.model';

@Injectable()
export class CreateFornecedorService {
  private readonly logger = new Logger('CreateFornecedorService');

  async CreateFornecedor(
    id_usuario: number,
    FornecedorDTO: CreateFornecedorDto,
  ): Promise<Fornecedor> {
    this.logger.log('Tentativa de criação de fornecedor');

    const usuarioExiste = await Usuario.findOne({ where: { id: id_usuario } });

    if (!usuarioExiste) {
      this.logger.error('400 - Usuário não existe');
      throw new HttpException('Usuário não existe', 400);
    }

    const novoFornecedor = await Fornecedor.create({
      ...FornecedorDTO,
      id_usuario,
    });

    this.logger.verbose(
      `201 - Novo fornecedor cadastrado com sucesso com ID: ${novoFornecedor.id}`,
    );

    return novoFornecedor;
  }
}
