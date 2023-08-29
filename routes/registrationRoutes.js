const express = require("express");
const {
    createUser,
    verifyUser,
} = require("../controllers/registrationController");

const router = express.Router();

router.post("/register", createUser);
router.post("/verify", verifyUser);

module.exports = router;
