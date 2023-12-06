import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.model';

export enum Tipo {
    compra = "Compra",
    garantia = "Garantia"
}

@Table
export class Entrada extends Model {
  @Column
  item: number;

  @Column
  tipo: Tipo;

  @Column
  descricao: string;

  @Column
  nf: string;

  @Column
  quantidade: number;

  @ForeignKey(() => Usuario)
  @Column
  id_usuario: string;

//   @ForeignKey(() => Produto)
  @Column
  id_produto: string;

//   @ForeignKey(() => Fabricante)
  @Column
  id_fornecedor: string;

}