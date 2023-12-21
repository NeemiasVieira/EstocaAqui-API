'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Produto', 'unidade_de_medida');
    await queryInterface.removeColumn('Produto', 'quantidade_medida');
    await queryInterface.addColumn('Produto', 'cor', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.addColumn('Produto', 'unidade_de_medida', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Produto', 'quantidade_medida', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  
    await queryInterface.removeColumn('Produto', 'cor');
    
  }
};
