const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./sequelizeInstance'); // Your Sequelize instance
const registrationRoutes = require('./routes/registrationRoutes.js'); // Your registration routes
const whitelist = [];
const User = require('./models/userModels'); // Import the User model

const app = express();

// Middleware and other configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: whitelist, credentials: true })); // required

// Routes
//app.use('/registration', registrationRoutes);

// Sync the model with the database and start the server
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
