import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { ItemSaidaDto } from './item.saida.dto';

export enum tipo {
  venda = 'Venda',
  outros = 'Outros',
}

@Table({
  tableName: 'Saida',
})
export class Saida extends Model {
  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(tipo),
  })
  tipo: tipo;

  @Column({
    type: DataType.STRING,
  })
  descricao: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nf: string;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @Column({
    type: DataType.JSON,
    values: Object.values(ItemSaidaDto),
  })
  item: ItemSaidaDto[];

}
