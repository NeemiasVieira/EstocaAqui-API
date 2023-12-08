import { Injectable, Logger } from '@nestjs/common';
import { Saida } from '../../saida.model';
import { CreateSaidaDto } from './create-saida.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class CreateSaidaService {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger('CreateSaidaService');

  async createSaida(
    idUsuario: string,
    dadosDasaidaASerCriada: CreateSaidaDto,
    idGrupo: string,
  ): Promise<object> {
    this.logger.log('Tentativa de criação de saida');

    //Criar um método em appService para verificar os produtos na saída;
    await this.appService.verificaProdutos(dadosDasaidaASerCriada, idGrupo);
    // CONTINUAR DAQUI

    const novaSaida = await Saida.create({
      ...dadosDasaidaASerCriada,
      idUsuario,
    });

    this.logger.verbose(`201 - Entrada criada!`);

    return {
      mensagem: 'Saida criada com sucesso',
      saida: novaSaida,
    };
  }
}
