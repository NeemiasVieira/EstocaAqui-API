import { IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: "GabrielF" })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123!',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ description: 'Nome completo do usuário' , example: "Gabriel Farias da Silva"})
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Número de telefone do usuário', example: "(13) 996020923" })
  @IsString()
  phoneNumber: string;
}