const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Review = sequelize.define('review', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pros: Sequelize.STRING,
  cons: Sequelize.STRING,
  //we will fill company id here by associations
})

module.exports = Review;