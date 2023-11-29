import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tipo } from '../../entradas.model';

export class CreateEntradaDto {
  @ApiProperty({ description: 'Número do item na nota fiscal', example: 1 })
  @IsNotEmpty({message: "O campo item é obrigatório"})
  @IsNumber()
  item: number;

  @ApiProperty({
    description: 'Tipo do operação',
    example: 'Compra',
  })
  @IsNotEmpty({ message: 'O campo tipo é obrigatório' })
  @IsString()
  tipo: Tipo;

  @ApiProperty({
    description: 'Descrição da entrada',
    example: 'Notebooks para utilização dos estagiários',
  })
  @IsString()
  @MaxLength(250)
  descricao: string;

  @ApiProperty({ description: 'Nota Fiscal' , example: "3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968"})
  @IsString()
  @MaxLength(44)
  nf: string;

  @ApiProperty({ description: 'Quantidade do mesmo item', example: 3 })
  @IsNotEmpty({message: "O campo quantidade é obrigatório"})
  @IsNumber()
  quantidade: number;

  @ApiProperty({ description: 'ID do fabricante', example: "32"})
  @IsNotEmpty({message: "O campo id_fabricante é obrigatório"})
  @IsString()
  id_fornecedor: string;

  @ApiProperty({ description: 'ID do produto', example: "47"})
  @IsNotEmpty({message: "O campo id_produto é obrigatório"})
  @IsString()
  id_produto: string;
  
}