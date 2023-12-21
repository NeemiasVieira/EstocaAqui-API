'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Produto', 'valor_de_compra', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('Produto', 'valor_de_venda', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Produto', 'valor_de_compra');
    await queryInterface.removeColumn('Produto', 'valor_de_venda');
  }
};
