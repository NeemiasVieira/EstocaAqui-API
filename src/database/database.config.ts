import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import { User } from 'src/modules/users/user.model';
import { Fornecedor } from 'src/modules/fornecedores/fornecedor.model';
import { Entrada } from 'src/modules/entradas/entradas.model';
import { Grupo } from 'src/modules/grupos/grupo.model';

//Database config
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres',
        dialectModule: pg, //Necessário para deploy na vercel
        dialectOptions: {
          //Necessário para usar o PostgreSQL no Azure
          ssl: {
            require: true,
          },
        },
      });

      //Carrega os modelos do projeto
      sequelize.addModels([User, Entrada, Fornecedor, Grupo]);
      await sequelize.sync();

      //Teste de conexão com o banco de dados
      try {
        await sequelize.authenticate();
        console.log(
          'Conexão com o banco de dados estabelecida com sucesso! 🚀',
        );
      } catch (error) {
        console.error('Erro de conexão com o banco de dados', error);
      }
    },
  },
];
