import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import { User } from 'src/modules/users/user.model';
import { Fornecedor } from 'src/modules/fornecedores/fornecedor.model';

//Database config
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.HOST,
        port: 5432,
        username: process.env.BD_USER,
        password: process.env.PASSWORD,
        database: 'postgres',
        dialectModule: pg, //Necessário para deploy na vercel
        dialectOptions: {
          //Necessário para usar o PostgreSQL no Azure
          ssl: {
            require: true,
          },
        },
      });

      //Load Models from project
      sequelize.addModels([User, Fornecedor]);
      await sequelize.sync();

      //Test database connection
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
