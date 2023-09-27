const { SpotImage, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const express = require('express');
const router = express.Router();

// how to make sure currently logged in user is owner?
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const doomedImage = await SpotImage.findByPk(req.params.imageId);

    if (doomedImage) {
        const spot = await Spot.findByPk(doomedImage.spotId);
        if (spot.ownerId === req.user.id) {
            await doomedImage.destroy();
            return res.status(200).json({ message: "Successfully deleted" });
        }
        // add an else for what to do if no logged in user
        // and if logged in user is incorrect
    } else {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }
});

module.exports = router;
