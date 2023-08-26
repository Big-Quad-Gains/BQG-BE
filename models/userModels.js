const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance'); 
const EmailAddress = require('./emailAddresses'); 

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
});

const PhysicalStanding = sequelize.define('PhysicalStanding', {
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
});

const WellnessInterests = sequelize.define('WellnessInterests', {
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

const UsernameAndPassword = sequelize.define('UsernameAndPassword', {
  // Username and Password
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// relationships definitions
User.hasOne(PhysicalStanding);
User.hasOne(WellnessInterests);
User.hasOne(UsernameAndPassword);
PhysicalStanding.belongsTo(User);
WellnessInterests.belongsTo(User);
UsernameAndPassword.belongsTo(User);
User.hasOne(EmailAddress, { foreignKey: 'userId' });
EmailAddress.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ alter: true });

module.exports = { User, PhysicalStanding, WellnessInterests, UsernameAndPassword };
