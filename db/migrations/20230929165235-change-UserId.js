'use strict';

const {DataTypes } = require("sequelize");
const {CUSTOMER_TABLE} = require("./../models/costumer.model")

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE , "userId" , {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique : true,
  });
  },

  async down (queryInterface) {
    //await queryInterface.drop( CUSTOMER_TABLE );
  }
};
