const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); // Your Sequelize instance

const EmailAddress = sequelize.define('EmailAddress', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Sync model
EmailAddress.sync();

module.exports = EmailAddress;
