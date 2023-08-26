const { Sequelize } = require("sequelize");

// Replace these with your actual database credentials
const sequelize = new Sequelize("huawei_itc_test", "root", "Adipers0n_", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
