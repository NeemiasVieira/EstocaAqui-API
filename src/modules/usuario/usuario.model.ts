import { BelongsTo, Column, ForeignKey, Model, Table, DataType} from 'sequelize-typescript';
import { Grupo } from '../grupo/grupo.model';

@Table({
  tableName: "Usuario"
})
export class Usuario extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  telefone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  senha: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  imagem_de_perfil: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  permissao: string;

  @ForeignKey(() => Grupo)
  @Column
  id_grupo: number;

  @BelongsTo(() => Grupo)
  grupo: Grupo;
  

}
