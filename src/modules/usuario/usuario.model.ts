import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Grupo } from '../grupo/grupo.model';

@Table({
  tableName: "Usuario"
})
export class Usuario extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column
  telefone: string;

  @Column
  senha: string;

  @Column
  imagem_de_perfil: string;

  @Column
  cpf: string;

  @Column
  permissao: string;

  @ForeignKey(() => Grupo)
  @Column
  id_grupo: number;

  @BelongsTo(() => Grupo)
  grupo: Grupo;
  

}
