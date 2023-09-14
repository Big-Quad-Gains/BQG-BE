const { Sequelize } = require("sequelize");
const fs = require("fs");
// Replace these with your actual database credentials
// const sequelize = new Sequelize("huawei_itc_test", "postgres", "Adipers0n", {
//     host: "localhost",
//     dialect: "postgres",
//     schema: "users",
// });

const sequelize = new Sequelize("BQG_DB", "root", "Adipers0n_", {
    host: "119.8.160.224",
    port: 5432,
    dialect: "postgres",
    dialectModule: require("pg"),
    define: {
        timestamps: false,
    },
    schema: "BQG_users",
    ssl: {
        ca: fs.readFileSync("/Users/adi/Huawei_ITC/BQG-BE/ssl_certificate.crt"), // Path to your CA certificate
        // key: fs.readFileSync("/path/to/your/client-key.pem"), // Path to your client key
        // cert: fs.readFileSync("/path/to/your/client-cert.pem"), // Path to your client certificate
    },
});

module.exports = sequelize;
