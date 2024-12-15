const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Company = sequelize.define('company', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  companyname: Sequelize.STRING,
  average: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  entries: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Company;