const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Invalid email"),
    check("username")
        .exists({ checkFalsy: true})
        .withMessage("Username is required"),
    check("username")
        .isLength({ min: 4 })
        .withMessage("Username is required."),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email."),
    // check("password")
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 6 })
    //     .withMessage("Password must be 6 characters or more."),
    check("firstName")
        .exists({ checkFalsy: true})
        .withMessage("First Name is required"),
    check("lastName")
        .exists({ checkFalsy: true})
        .withMessage("Last Name is required"),
    handleValidationErrors
];

router.post(
    "/",
    validateSignup,
    async (req, res) => {
        try {
        const { firstName, lastName, email, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ firstName, lastName, email, username, hashedPassword });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

            await setTokenCookie(res, safeUser);

            return res.json({
                user: safeUser
            });

            // return any errors
            return error;

    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}

);

module.exports = router;
