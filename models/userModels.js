const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); // Your Sequelize instance

const User = sequelize.define('User', {
  // Identification
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  languagePreference: {
    type: DataTypes.STRING,
  },

  // Physical Standing
  height: {
    type: DataTypes.FLOAT,
  },
  weight: {
    type: DataTypes.FLOAT,
  },
  activityLevel: {
    type: DataTypes.STRING,
  },
  goals: {
    type: DataTypes.STRING,
  },
  dietaryPreferences: {
    type: DataTypes.STRING,
  },
  knownMedicalConditions: {
    type: DataTypes.STRING,
  },

  // Wellness Interests
  hobbies: {
    type: DataTypes.STRING,
  },
  stressSources: {
    type: DataTypes.STRING,
  },
  wellnessInterests: {
    type: DataTypes.STRING,
  },
});

sequelize.sync({ alter: true });
module.exports = User;
