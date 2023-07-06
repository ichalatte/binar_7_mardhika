"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      player_1: {
        type: Sequelize.STRING,
        defaultValue: "No player",
      },
      player_2: {
        type: Sequelize.STRING,
        defaultValue: "No player",
      },
      winner: {
        type: Sequelize.STRING,
        defaultValue: "No Result",
      },
      times: {
        type: Sequelize.STRING,
        defaultValue: "No Update",
      },
      room: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      result: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ["", "", "", "", "", ""],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Games");
  },
};
