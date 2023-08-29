const {
    storeUser,
    verifyCode,
    sendVerificationCode,
    generateVerificationCode,
} = require("../services/registrationServices");

async function createUser(req, res) {
    try {
        const userData = req.body;

        // Generate a random verification code
        const verificationCode = generateVerificationCode();
        userData.verificationCode = verificationCode;

        // Store user data
        const newUser = await storeUser(userData);

        // Send verification code to user's Gmail
        await sendVerificationCode(newUser.email, verificationCode);

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "An error occurred while creating user.",
        });
    }
}
// verify code
const verifyUser = async (req, res) => {
    const { email, code } = req.body;

    try {
        const isCodeValid = await verifyCode(email, code);

        if (isCodeValid) {
            return res.status(200).json({ message: "Welcome to BQG" });
        } else {
            return res.status(400).json({ error: "Invalid verification code" });
        }
    } catch (error) {
        console.error("Error in verification code submission:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createUser,
    verifyUser,
};
