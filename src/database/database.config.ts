import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';

//Database config
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.HOST,
        port: 5432, 
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: 'postgres',
        dialectModule: pg, //Required for deploy using vercel
        dialectOptions: { //Required to use a PostgreSQL database on Azure
          ssl: {
            require: true,
          }
        }
      });

      //Load Models from project
      sequelize.addModels([])      
      await sequelize.sync();

      //Test database connection
      try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso! 🚀');
      } catch (error) {
        console.error('Erro de conexão com o banco de dados', error);
      }
    },
  },
];