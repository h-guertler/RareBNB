const { SpotImage, Spot, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const express = require('express');
const router = express.Router();

router.delete("/:imageId",
    requireAuth,
    async (req, res, next) => {
        const doomedImage = await SpotImage.findByPk(req.params.imageId);

        if (!doomedImage) return res.status(404).json({ message: "Spot Image couldn't be found" });

        const spot = await Spot.findByPk(doomedImage.spotId);
        if (spot.ownerId === req.user.id) {
            await doomedImage.destroy();
            return res.json({ message: "Successfully deleted"});
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    });

module.exports = router;
