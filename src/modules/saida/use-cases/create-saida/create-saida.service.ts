import { Injectable, Logger } from '@nestjs/common';
import { Saida } from '../../saida.model';
import { CreateSaidaDto } from './create-saida.dto';

@Injectable()
export class CreateSaidaService {
  private readonly logger = new Logger('CreateSaidaService');

  async createSaida(
    idUsuario: string,
    dadosDasaidaASerCriada: CreateSaidaDto,
  ): Promise<object> {
    this.logger.log('Tentativa de criação de saida');

    const novaSaida = await Saida.create({
      ...dadosDasaidaASerCriada,
      idUsuario,
    });

    this.logger.verbose(`201 - Entrada criada!`);

    return {
      message: 'Saida criada com sucesso',
      saida: novaSaida,
    };
  }
}
