import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MaxLength } from 'class-validator';
import { tipo } from '../../saida.model';
import { ItemEntradaDto } from 'src/modules/entrada/item.dto';

export class UpdateSaidaDto {
  @ApiProperty({
    description: 'Tipo do operação',
    example: 'Venda',
  })
  @IsString()
  tipo: tipo;

  @ApiProperty({
    description: 'Descrição da saída',
    example: 'Produtos vendidos para o cliente X',
  })
  @IsString()
  @MaxLength(250)
  descricao: string;

  @ApiProperty({
    description: 'Nota Fiscal',
    example: '3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968',
  })
  @IsString()
  @MaxLength(44)
  nf: string;

  @ApiProperty({ description: 'Itens da entrada', type: ItemEntradaDto })
  @IsArray()
  item: ItemEntradaDto[];
}
