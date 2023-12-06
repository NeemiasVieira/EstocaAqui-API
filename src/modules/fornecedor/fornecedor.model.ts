import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table({
  tableName: "Fornecedor"
})
export class Fornecedor extends Model {
  @Column
  razao_social: string;

  @Column
  nome_fantasia: string;

  @Column
  cnpj: string;

  @ForeignKey(() => Usuario)
  @Column
  id_usuario: string

}