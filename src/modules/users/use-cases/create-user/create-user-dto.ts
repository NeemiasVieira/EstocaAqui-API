import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: "GabrielF" })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'gabrielfarias@outlook.com',
  })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail precisa ser válido!' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123!',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ description: 'Nome completo do usuário' , example: "Gabriel Farias da Silva"})
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Número de telefone do usuário', example: "(13) 996020923" })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}