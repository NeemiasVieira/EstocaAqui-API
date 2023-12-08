import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

export enum tipo {
  venda = 'Venda',
  outros = 'Outros',
}

@Table({
  tableName: 'Saida',
})
export class Saida extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  item: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(tipo),
  })
  tipo: tipo;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descricao: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nf: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantidade: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  //Linkar com o estoque
  /* @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idUsuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario; */
}
