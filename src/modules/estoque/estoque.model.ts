import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Entrada } from "../entrada/entradas.model";

@Table({
    tableName: "Estoque"
  })
  export class Estoque extends Model {
    @Column
    quantidade: number;
  
    @ForeignKey(() => Entrada)
    @Column
    id_entrada: string
  
  }