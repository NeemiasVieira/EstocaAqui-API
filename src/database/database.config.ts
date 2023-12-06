import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';
import { Usuario } from 'src/modules/usuario/usuario.model';
import { Fornecedor } from 'src/modules/fornecedor/fornecedor.model';
import { Entrada } from 'src/modules/entradas/entradas.model';
import { Grupo } from 'src/modules/grupos/grupo.model';
import { Produto } from 'src/modules/produtos/produto.model';

//Database config
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        
        logging: false,
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
      sequelize.addModels([Usuario, Entrada, Fornecedor, Produto, Grupo]);
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
