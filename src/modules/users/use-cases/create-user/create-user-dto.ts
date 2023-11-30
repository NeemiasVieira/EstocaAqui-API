import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário', example: "Gabriel Farias da Silva" })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'gabrielfarias@outlook.com',
  })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail precisa ser válido!' })
  email: string;

  @ApiProperty({description: "Telefone do usuário", example: "(13) 99702-3584"})
  @IsNotEmpty({message: "O campo telefone é obrigatório"})
  @IsString()
  telefone: string;


  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123@',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  senha: string;

  @ApiProperty({ description: 'Link da imagem de perfil do usuário' , example: "https://example.imagem.img"})
  @IsString()
  imagem_de_perfil?: string;

  @ApiProperty({ description: 'CPF do usuário', example: "403.854.234/31" })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Grupo de permissão do usuário', example: "admin" })
  @IsString()
  permissao: string;

  @ApiProperty({ description: 'ID do grupo que o usuário pertence', example: "2" })
  @IsNumber()
  id_grupo: number;

}