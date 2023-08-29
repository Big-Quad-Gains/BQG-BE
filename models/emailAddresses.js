const { DataTypes } = require("sequelize");
const sequelize = require("../sequelizeInstance");

const EmailAddress = sequelize.define("EmailAddress", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});

//sequelize.sync();

module.exports = EmailAddress;
