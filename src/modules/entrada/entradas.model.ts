import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';
import { ItemEntradaDto } from './item.dto';
import { Fornecedor } from '../fornecedor/fornecedor.model';

export enum Tipo {
    compra = "Compra",
    garantia = "Garantia"
}

@Table({
  tableName: "Entrada"
})
export class Entrada extends Model {
  
  @Column
  tipo: Tipo;
  
  @Column
  descricao: string;
  
  @Column
  nf: string;
  
  @Column
  @ForeignKey(() => Fornecedor)
  id_fornecedor: string;

  @ForeignKey(() => Usuario)
  @Column
  id_usuario: string;

  @Column({
    values: Object.values(ItemEntradaDto),
    type: DataType.JSON
  })
  item: ItemEntradaDto;

}