const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./sequelizeInstance'); 
const registrationRoutes = require('./routes/registrationRoutes.js'); 
const whitelist = [];
const User = require('./models/userModels'); 
const app = express();

// Middleware and other configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: whitelist, credentials: true })); // required

// Routes
//app.use('/registration', registrationRoutes);

// server 
sequelize
.sync({ alter: true })
.then(() => {
    const PORT = process.env.PORT || 3500;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
