import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table({
  tableName: "Grupo"
})
export class Grupo extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  razao_social: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nome_fantasia: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  logo: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banner: string

  @HasMany(() => Usuario)
  usuarios: Usuario[]

}