import { IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/modules/usuario/use-cases/create-usuario/create-usuario-dto';
import { CreateGrupoDto } from './create-grupo.dto';
export class CreateUsuarioGrupoDto {

  @ApiProperty({ description: 'Usuário'})
  @IsNotEmptyObject({}, {message: "O objeto usuario é obrigatório"})
  usuario: CreateUsuarioDto;

  @ApiProperty({ description: 'Grupo'})
  @IsNotEmptyObject({}, {message: "O objeto grupo é obrigatório"})
  grupo: CreateGrupoDto;

} 