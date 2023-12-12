import { Injectable, Logger } from '@nestjs/common';
import { CreateEntradaDto } from './create-entrada.dto';
import { Entrada } from '../../entradas.model';
import { AppService } from 'src/app.service';

@Injectable()
export class CreateEntradaService {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger('CreateEntradaService');

  async CreateEntrada(
    id_usuario: number,
    entrada: CreateEntradaDto,
    id_grupo: number,
  ): Promise<Entrada> {
    this.logger.log('Tentativa de criação de entrada');

    //Verifica se o fornecedor existe e se o usuário está no mesmo grupo de permissões

    await this.appService.verificaFornecedor(+entrada.id_fornecedor, id_grupo);

    //Verifica se cada produto existe e se o usuário está no mesmo grupo de permissões

    await this.appService.verificaProdutos(entrada, id_grupo);

    const novaEntrada = await Entrada.create({
      ...entrada,
      id_usuario,
    });

    await this.appService.somaProdutos(entrada);

    this.logger.verbose(`201 - Entrada criada com o ID ${novaEntrada.id}`);

    return novaEntrada;
  }
}
