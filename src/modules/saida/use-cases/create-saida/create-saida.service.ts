import { Injectable, Logger } from '@nestjs/common';
import { Saida } from '../../saida.model';
import { CreateSaidaDto } from './create-saida.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class CreateSaidaService {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger('CreateSaidaService');

  async createSaida(id_usuario: string, id_grupo: number, dadosDasaidaASerCriada: CreateSaidaDto): Promise<Saida> {
    this.logger.log('Tentativa de criação de saida');

    await this.appService.verificaProdutos(dadosDasaidaASerCriada, id_grupo);

    const novaSaida = await Saida.create({ ...dadosDasaidaASerCriada, id_usuario });

    await this.appService.subtraiProdutos(dadosDasaidaASerCriada);

    this.logger.verbose(`201 - Saída criada!`);

    return novaSaida;
  }
}
