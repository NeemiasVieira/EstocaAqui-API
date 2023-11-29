import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';

enum Tipo {
    compra = "Compra",
    garantia = "Garantia"
}

@Table
export class Entradas extends Model {
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

  @ForeignKey(() => User)
  @Column
  id_usuario: string;

//   @ForeignKey(() => Produto)
//   @Column
//   id_produto: string;

//   @ForeignKey(() => Fabricante)
//   @Column
//   id_fabricante: string;

}