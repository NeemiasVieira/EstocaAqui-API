import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Password123!',
  })
  @IsNotEmpty()
  senha: string;
}