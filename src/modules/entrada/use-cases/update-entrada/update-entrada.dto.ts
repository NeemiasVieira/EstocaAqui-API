import { IsString, MaxLength, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tipo } from '../../entradas.model';
import { ItemEntradaDto } from '../../item.dto';

export class UpdateEntradaDto {
  @ApiProperty({ description: 'Tipo do operação', example: 'Compra' })
  @IsString()
  @IsOptional()
  tipo: Tipo;

  @ApiProperty({ description: 'Descrição da entrada', example: 'Notebooks para utilização dos estagiários' })
  @IsString()
  @MaxLength(250)
  @IsOptional()
  descricao: string;

  @ApiProperty({ description: 'Nota Fiscal', example: '3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968' })
  @IsString()
  @MaxLength(44)
  @IsOptional()
  nf: string;

  @ApiProperty({ description: 'ID do fornecedor', example: '32' })
  @IsString()
  @IsOptional()
  id_fornecedor: string;

  @ApiProperty({
    description: 'Itens da entrada',
    type: ItemEntradaDto,
    example: {
      id_produto: 5,
      quantidade: 5,
    },
  })
  @IsArray()
  @IsOptional()
  item: ItemEntradaDto[];
}
