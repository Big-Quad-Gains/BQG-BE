const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./sequelizeInstance");
const registrationRoutes = require("./routes/registrationRoutes.js");
const {
    User,
    PhysicalStanding,
    WellnessInterests,
    UsernameAndPassword,
} = require("./models/userModels"); // Destructure models
const EmailAddress = require("./models/emailAddresses");
const whitelist = [];
const app = express();

// Middleware and other configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: whitelist, credentials: true }));

// Routes
function RoutesSetup(app) {
    app.use("/api/portal", registrationRoutes);
}
RoutesSetup(app);

//Database connection
(async () => {
    try {
        await User.sync();
        await PhysicalStanding.sync();
        await WellnessInterests.sync();
        await UsernameAndPassword.sync({ auto: true });
        await EmailAddress.sync();

        // Start the server
        const PORT = process.env.PORT || 3500;
        app.listen(PORT, () => {
            console.log(
                "\x1b[42m",
                `Server is running on port ${PORT}`,
                "\x1b[0m"
            );
        });
    } catch (error) {
        console.error(
            "\x1b[31m",
            "Unable to connect to the database:",
            "\x1b[0m",
            error
        );
    }
    // finally {
    //     sequelize.close();
    // }
})();
