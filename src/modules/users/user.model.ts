import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
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

  //@ForeignKey(() => Grupo)
  @Column
  id_grupo: number;
  

}
