const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors =
    (req, res, next) => {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const err = Error("Bad request.");
            err.title = "Bad request.";
            const errors = {};
            const msgArray = [];
            validationErrors
            .array()
            .forEach(error => {
                errors[error.path] = error.msg
                console.log("err message: " + error.msg)
                // if the meessage is one to side, set err.status = 403
                if (error.msg = ("Start date conflicts with an existing booking"
                || "End date conflicts with an existing booking")) {
                    err.status = 403;
                    err.message = "Sorry, this spot is already booked for the specified dates"
                }
            }
            );

            err.errors = errors;
            if (!err.status) err.status = 400;

            next(err);
        }
        next();
    };

    module.exports = {
        handleValidationErrors
    };
