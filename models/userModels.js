const { DataTypes } = require("sequelize");
const sequelize = require("../sequelizeInstance");
const EmailAddress = require("./emailAddresses");

const User = sequelize.define("User", {
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

const PhysicalStanding = sequelize.define("PhysicalStanding", {
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
        allowNull: true,
    },
});

const WellnessInterests = sequelize.define("WellnessInterests", {
    // Wellness Interests
    hobbies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stressSources: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    wellnessInterests: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

const UsernameAndPassword = sequelize.define("UsernameAndPassword", {
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
    verificationCode: {
        type: DataTypes.STRING,
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
User.hasOne(EmailAddress, { foreignKey: "userId" });
EmailAddress.belongsTo(User, { foreignKey: "userId" });

//sequelize.sync({ alter: true });
//sequelize.sync();

module.exports = {
    User,
    PhysicalStanding,
    WellnessInterests,
    UsernameAndPassword,
};
