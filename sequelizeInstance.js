const { Sequelize } = require("sequelize");

// Replace these with your actual database credentials
const sequelize = new Sequelize("huawei_itc_test", "postgres", "Adipers0n", {
    host: "localhost",
    dialect: "postgres",
    schema: "users",
});

module.exports = sequelize;
