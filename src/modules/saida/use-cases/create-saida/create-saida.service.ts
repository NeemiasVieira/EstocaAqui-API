import { Injectable, Logger } from '@nestjs/common';
import { Saida } from '../../saida.model';
import { CreateSaidaDto } from './create-saida.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class CreateSaidaService {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger('CreateSaidaService');

  async createSaida(
    id_usuario: string,
    dadosDasaidaASerCriada: CreateSaidaDto,
    id_grupo: string,
  ): Promise<object> {
    this.logger.log('Tentativa de criação de saida');

    //Criar um método em appService para verificar os produtos na saída;
    await this.appService.verificaProdutos(dadosDasaidaASerCriada, id_grupo);
    // CONTINUAR DAQUI

    const novaSaida = await Saida.create({
      ...dadosDasaidaASerCriada,
      id_usuario,
    });

    this.logger.verbose(`201 - Saída criada!`);

    return {
      mensagem: 'Saida criada com sucesso',
      saida: novaSaida,
    };
  }
}
