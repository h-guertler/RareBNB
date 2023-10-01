const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require ("../db/models");
const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    // creates the token
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // sets the token cookie
    res.cookie("token", token, {
        maxAge: expiresIn * 1000, // multiplied by 1000 because it's in ms
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

// restores the user's session based on their cookie
const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ["email", "createdAt", "updatedAt"]
                }
            });
        } catch (e) {
            res.clearCookie("token");
            return next();
        }

        if (!req.user) {
            res.clearCookie("token");
        }

        return next();
    })
};

const requireAuth = function (req, res, next) {
    if (req.user) return next();
    res.status(401).send({ message: "Authentication required" });
    const err = new Error("Authentication required");
    err.title = "Authentication required";
    err.errors =  { message: "Authentication required" };
    err.status = 401;
    return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth };
