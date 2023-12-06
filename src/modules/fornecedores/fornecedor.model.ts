import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../usuario/usuario.model';

@Table
export class Fornecedor extends Model {
  @Column
  razao_social: string;

  @Column
  nome_fantasia: string;

  @Column
  cnpj: string;

  @ForeignKey(() => User)
  @Column
  id_usuario: string

}