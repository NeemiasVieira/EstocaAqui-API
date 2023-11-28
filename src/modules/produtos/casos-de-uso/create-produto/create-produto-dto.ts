import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { unidadeDeMedida } from '../produto.model';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Produto A' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Tipo do produto', example: 'Tipo A' })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Descrição do produto A',
  })
  @IsNotEmpty()
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

  @ApiProperty({ description: 'Quantidade medida do produto', example: 500 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'A quantidade medida deve ser maior que zero' })
  quantidade_medida: number;

  @ApiProperty({
    description: 'ID do usuário proprietário do produto',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
