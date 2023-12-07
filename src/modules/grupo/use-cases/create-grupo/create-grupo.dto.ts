import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGrupoDto {
  @ApiProperty({ description: 'Nome do grupo', example: "Modal Gestão e Resultados" })
  @IsNotEmpty({ message: 'O campo razao_social é obrigatório' })
  @IsString()
  @MinLength(2)
  razao_social: string;

  @ApiProperty({description: 'Nome da marca', example: 'ModalGR', })
  @IsNotEmpty({ message: 'O campo nome_fantasia é obrigatório' })

  nome_fantasia: string;

  @ApiProperty({ description: 'CNPJ do grupo', example: '20031239000328!', })
  @IsNotEmpty({ message: 'O campo cnpj é obrigatório' })
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