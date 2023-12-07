import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { tipo } from '../../saida.model';

export class CreateSaidaDto {
  @ApiProperty({ description: 'O que caralhos é item?', example: 666 })
  @IsNotEmpty({ message: 'O campo item é obrigatório' })
  @IsNumber()
  item: number;

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
  @MaxLength(250)
  descricao: string;

  @ApiProperty({
    description: 'Nota Fiscal',
    example: '3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968',
  })
  @IsString()
  @MaxLength(44)
  nf: string;

  @ApiProperty({ description: 'Quantidade do mesmo item', example: 2 })
  @IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
  @IsNumber()
  quantidade: number;

  /* @ApiProperty({ description: 'ID do usuário', example: 1 })
  @IsNotEmpty({ message: 'O campo idUsuario é obrigatório' })
  @IsNumber()
  idUsuario: number; */
}
