import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

@Table({
  tableName: 'Fornecedor',
})
export class Fornecedor extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  razao_social: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome_fantasia: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cnpj: string;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  id_usuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
