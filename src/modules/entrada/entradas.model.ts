import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { ItemEntradaDto } from './item.dto';
import { Fornecedor } from '../fornecedor/fornecedor.model';

export enum Tipo {
  compra = 'Compra',
  garantia = 'Garantia',
}

@Table({
  tableName: 'Entrada',
})
export class Entrada extends Model {
  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(Tipo),
  })
  tipo: Tipo;

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

  @ForeignKey(() => Fornecedor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_fornecedor: number;

  @BelongsTo(() => Fornecedor)
  fornecedor: Fornecedor;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column({
    values: Object.values(ItemEntradaDto),
    type: DataType.JSON,
  })
  item: ItemEntradaDto[];
}
