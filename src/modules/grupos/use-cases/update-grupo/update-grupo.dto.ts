import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGrupoDto {
  @ApiProperty({ description: 'Nome do grupo', example: "Modal Gestão e Resultados" })
  @IsString()
  @MinLength(2)
  razao_social: string;

  @ApiProperty({description: 'Nome da marca', example: 'ModalGR', })
  @IsString()

  nome_fantasia: string;

  @ApiProperty({ description: 'CNPJ do grupo', example: '20031239000328!', })
  @IsString()
  @MinLength(14)
  cnpj: string;

  @IsString()
  @ApiProperty({ description: 'LogoTipo do grupo', example: 'https://example.com/logo.png!', })
  logo: string;

  @IsString()
  @ApiProperty({ description: 'Banner do grupo', example: 'https://example.com/banner.png!', })
  banner: string
} 