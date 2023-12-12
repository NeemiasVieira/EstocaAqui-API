import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, Min, MinLength, MaxLength, IsOptional } from 'class-validator';
import { unidadeDeMedida } from '../../produto.model';

export class UpdateProdutoDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Coca Cola' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(90)
  nome: string;

  @ApiProperty({ description: 'Tipo do produto', example: 'Refrigerante' })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Descrição sobre o produto',
  })
  @IsOptional()
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'Unidade de medida do produto',
    example: 'ml',
    enum: Object.values(unidadeDeMedida),
  })
  @IsNotEmpty()
  @IsEnum(unidadeDeMedida, { message: 'Unidade de medida inválida' })
  unidade_de_medida: unidadeDeMedida;

  @ApiProperty({ description: 'Quantidade medida do produto', example: 350 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'A quantidade medida deve ser maior que zero' })
  quantidade_medida: number;
}
