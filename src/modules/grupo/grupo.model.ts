import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table({
  tableName: "Grupo"
})
export class Grupo extends Model {
  @Column
  razao_social: string;

  @Column
  nome_fantasia: string;

  @Column
  cnpj: string;

  @Column
  logo: string

  @Column
  banner: string

}