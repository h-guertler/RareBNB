const { ReviewImage, Review, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const express = require('express');

const router = express.Router();

router.delete("/:imageId",
    requireAuth,
    async (req, res, next) => {

        const doomedImage = await ReviewImage.findByPk(req.params.imageId);

        if (!doomedImage) return res.status(404).json({ message: "Spot Image couldn't be found" });

        return res.json(doomedImage)
})

module.exports = router;
