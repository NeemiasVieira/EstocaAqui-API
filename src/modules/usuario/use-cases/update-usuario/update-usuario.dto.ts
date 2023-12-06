import { IsString, IsStrongPassword, MinLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Gabriel Farias da Silva',
  })

  @IsString()
  @MinLength(8)
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'gabrielfarias@outlook.com',
  })

  @IsEmail({}, { message: 'O e-mail precisa ser válido!' })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '(13) 99702-3584',
  })

  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123@',
  })

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  senha: string;

  @ApiProperty({
    description: 'Link da imagem de perfil do usuário',
    example: 'https://example.imagem.img',
  })
  @IsString()
  imagem_de_perfil?: string;

  @ApiProperty({
    description: 'Grupo de permissão do usuário',
    example: 'admin',
  })
  @IsString()
  permissao: string;
}
