import {BelongsTo,Column,DataType,ForeignKey,Model,Table,} from 'sequelize-typescript';
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

@Table({tableName: 'Produto',})

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
    allowNull: true,
  })
  descricao: string;

 @Column({
  type: DataType.STRING,
  allowNull: true,
 })
 cor: string;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_usuario: number;

  @ForeignKey(() => Grupo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })

  id_grupo: number;
  @BelongsTo(() => Grupo)
  grupo: Grupo;
}
