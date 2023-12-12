import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, IsArray } from 'class-validator';
import { tipo } from '../../saida.model';
import { ItemEntradaDto } from 'src/modules/entrada/item.dto';

export class CreateSaidaDto {
  @ApiProperty({
    description: 'Tipo do operação',
    example: 'Venda',
  })
  @IsNotEmpty({ message: 'O campo tipo é obrigatório' })
  @IsString()
  tipo: tipo;

  @ApiProperty({
    description: 'Descrição da saída',
    example: 'Produtos vendidos para o cliente X',
  })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  descricao: string;

  @ApiProperty({
    description: 'Nota Fiscal',
    example: '3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968',
  })
  @IsString()
  @IsOptional()
  @MaxLength(44)
  nf?: string;

  @ApiProperty({ description: 'Itens da entrada', type: ItemEntradaDto })
  @IsNotEmpty({ message: 'O campo item é obrigatório' })
  @IsArray()
  item: ItemEntradaDto[];
}
