import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFornecedorDto {
  @ApiProperty({ description: 'Nome da empresa', example: "MegaG Alimentos LTDA" })
  @IsNotEmpty({ message: 'O campo razao_social é obrigatório' })
  @IsString()
  @MinLength(2)
  razao_social: string;

  @ApiProperty({description: 'Nome da marca', example: 'MegaG', })
  @IsNotEmpty({ message: 'O campo nome_fantasia é obrigatório' })

  nome_fantasia: string;

  @ApiProperty({ description: 'CNPJ do fornecedor', example: '20031239000328!', })
  @IsNotEmpty({ message: 'O campo cnpj é obrigatório' })
  @IsString()
  @MinLength(14)
  cnpj: string;
} 