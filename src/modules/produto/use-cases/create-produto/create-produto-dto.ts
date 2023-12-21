import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, Min, MinLength, MaxLength, IsOptional } from 'class-validator';
import { unidadeDeMedida } from '../../produto.model';

export class CreateProdutoDto {
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
    description: "Cor da tag do produto",
    example: "#FFFFFF"
  })
  @IsString()
  @IsOptional()
  cor: string;

  @ApiProperty({
    description: 'Valor de compra em BRL',
    example: 25.79,
  })
  @IsNumber()
  @IsOptional()
  valor_de_compra: number;

  @ApiProperty({
    description: 'Valor de venda em BRL',
    example: 40.90,
  })
  @IsNumber()
  @IsOptional()
  valor_de_venda: number;
}
