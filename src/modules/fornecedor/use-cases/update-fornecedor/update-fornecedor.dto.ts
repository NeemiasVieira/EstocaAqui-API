import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFornecedorDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'MegaG Alimentos LTDA',
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  razao_social: string;

  @ApiProperty({ description: 'Nome da marca', example: 'MegaG' })
  @IsString()
  @IsOptional()
  nome_fantasia: string;

  @ApiProperty({
    description: 'CNPJ do fornecedor',
    example: '20031239000328!',
  })
  @IsString()
  @MinLength(14)
  @IsOptional()
  cnpj: string;
}
