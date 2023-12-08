import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tipo } from '../../entradas.model';
import { ItemEntradaDto } from '../../item.dto';

export class CreateEntradaDto {
  @ApiProperty({ description: 'Tipo do operação', example: 'Compra' })
  @IsNotEmpty({ message: 'O campo tipo é obrigatório' })
  @IsString()
  tipo: Tipo;

  @ApiProperty({ description: 'Descrição da entrada', example: 'Notebooks para utilização dos estagiários' })
  @IsString()
  @MaxLength(250)
  descricao: string;

  @ApiProperty({ description: 'Nota Fiscal', example: '3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968' })
  @IsString()
  @MaxLength(44)
  nf: string;

  @ApiProperty({ description: 'ID do fornecedor', example: '32' })
  @IsNotEmpty({ message: 'O campo id_fornecedor é obrigatório' })
  @IsString()
  id_fornecedor: string;

  @ApiProperty({ description: 'Itens da entrada', type: ItemEntradaDto })
  @IsNotEmpty({ message: 'O campo item é obrigatório' })
  item: ItemEntradaDto[];
}
