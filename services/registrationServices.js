const { randomBytes } = require("crypto");
const {
    User,
    PhysicalStanding,
    UsernameAndPassword,
} = require("../models/userModels");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

async function storeUser(userData) {
    try {
        const salt = generateSalt();
        const hashedPassword = await hashPassword(userData.password, salt);

        const verificationCode = generateVerificationCode();

        const newUser = await User.create(
            {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                gender: userData.gender,
                age: userData.age,
                languagePreference: userData.languagePreference,
                PhysicalStanding: {
                    height: userData.height,
                    weight: userData.weight,
                    activityLevel: userData.activityLevel,
                    dietaryPreferences: userData.dietaryPreferences,
                    knownMedicalConditions: userData.knownMedicalConditions,
                },
                UsernameAndPassword: {
                    username: userData.username,
                    passwordHash: hashedPassword,
                    salt: salt,
                    verificationCode: verificationCode,
                },
            },
            {
                include: [PhysicalStanding, UsernameAndPassword],
            }
        );

        await sendVerificationCode(newUser.email, verificationCode);

        return newUser;
    } catch (error) {
        throw error;
    }
}

function generateSalt() {
    return randomBytes(32).toString("hex");
}

function generateVerificationCode() {
    return Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
}

async function hashPassword(password, salt) {
    try {
        return await bcrypt.hash(password + salt, 10);
    } catch (error) {
        throw error;
    }
}

// nodemailer
async function sendVerificationCode(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: "BQG-2FA@outlook.com",
            pass: "Jamaicaisntarealcountry",
        },
    });

    const mailOptions = {
        from: "BQG-2FA@outlook.com",
        to: email,
        subject: "Verification Code",
        text: `Thank you for registering to BQG. Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
}

// verify the verification code
async function verifyCode(email, code) {
    try {
        const user = await User.findOne({
            where: { email },
            include: UsernameAndPassword, // UsernameAndPassword association
        });

        if (user && user.UsernameAndPassword.verificationCode === code) {
            await user.save();
            return true;
        }

        return false;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    storeUser,
    sendVerificationCode,
    verifyCode,
    generateVerificationCode,
};
