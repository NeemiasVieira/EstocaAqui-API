import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Grupo } from '../grupo/grupo.model';

export enum unidadeDeMedida {
  ml = 'ml',
  l = 'l',
  mg = 'mg',
  g = 'g',
  kg = 'kg',
  unidade = 'un',
}

@Table({
  tableName: 'Produto',
})
export class Produto extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantidade: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descricao: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(unidadeDeMedida),
  })
  unidade_de_medida: unidadeDeMedida;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  quantidade_medida: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  /* @BelongsTo(() => Usuario)
  usuario: Usuario; */

  @ForeignKey(() => Grupo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })

  id_grupo: number;
  @BelongsTo(() => Grupo)
  grupo: Grupo;


  //Precisa finalizar a questão do fabricante para poder linkar com o produto.
  /* @ForeignKey(() => Fabricante)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fabricanteId: number;

  @BelongsTo(() => Fabricante)
  fabriccante: Fabricante; */
}
