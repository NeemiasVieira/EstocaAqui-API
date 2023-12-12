import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGrupoDto {
  @ApiProperty({ description: 'Nome do grupo', example: "Modal Gestão e Resultados" })
  @IsString()
  @MinLength(2)
  @IsOptional()
  razao_social: string;

  @ApiProperty({description: 'Nome da marca', example: 'ModalGR', })
  @IsOptional()
  @IsString()

  nome_fantasia: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'LogoTipo do grupo', example: 'https://example.com/logo.png!', })
  logo: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Banner do grupo', example: 'https://example.com/banner.png!', })
  banner: string
} 