const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { spawn, exec } = require("child_process");
const readline = require("readline");
const bodyParser = require("body-parser"); // Add bodyParser to parse request bodies
const registrationRoutes = require("./routes/registrationRoutes.js");
const sequelize = require("./sequelizeInstance");
const {
    User,
    PhysicalStanding,
    WellnessInterests,
    UsernameAndPassword,
} = require("./models/userModels"); // Destructure models
const EmailAddress = require("./models/emailAddresses");

const whitelist = [];
const app = express();

const terminalProcesses = [];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: whitelist, credentials: true }));

// Add bodyParser middleware to parse request bodies as text
app.use(bodyParser.text());

// Function to create a new terminal and readline interface
function createTerminal() {
    // Check if the named pipe exists; if not, create it
    const pipePath = "/tmp/llamaPipe";

    exec(`mkfifo ${pipePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error("Error creating named pipe:", error);
        } else {
            const terminalProcess = spawn("npm", ["run", "bqg"], {
                shell: true,
                stdio: ["pipe", "pipe", process.stderr],
            });

            // Log terminal output to console
            terminalProcess.stdout.on("data", (data) => {
                console.log("Terminal Output:", data.toString());
            });

            // Log CLI output to console
            const cliInterface = readline.createInterface({
                input: terminalProcess.stdout,
                terminal: false,
            });

            cliInterface.on("line", (line) => {
                console.log("CLI Output:", line);
            });

            // Store the terminal process in the array
            terminalProcesses.push(terminalProcess);

            // Handle terminal process exit
            terminalProcess.on("exit", () => {
                // Remove the terminal process when it exits
                const index = terminalProcesses.indexOf(terminalProcess);
                if (index !== -1) {
                    terminalProcesses.splice(index, 1);
                }
            });
        }
    });
}

// Create multiple terminals, adjust the count as needed
createTerminal();

// Endpoint to send input to a specific terminal
app.post("/api/generate/:terminalId", async (req, res) => {
    try {
        const { terminalId } = req.params;
        const { inputText } = req.body;

        if (!inputText) {
            return res.status(400).json({ error: "Input text is required" });
        }

        const terminalProcess = terminalProcesses[terminalId];

        if (!terminalProcess) {
            return res.status(404).json({ error: "Terminal not found" });
        }

        // Send the input text to the terminal via stdin
        terminalProcess.stdin.write(inputText + "\n");

        res.status(200).json({ message: "Input sent to terminal" });
    } catch (error) {
        console.error("Error:", error.stack);
        res.status(500).json({ error: "Something went wrong" });
    }
});
// Routes
function RoutesSetup(app) {
    app.use("/api/portal", registrationRoutes);
}
RoutesSetup(app);

//Database connection
(async () => {
    try {
        // await User.sync();
        // await PhysicalStanding.sync();
        // await WellnessInterests.sync();
        // await UsernameAndPassword.sync({ auto: true });
        // await EmailAddress.sync();

        // Start the server
        const PORT = 3200;
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
