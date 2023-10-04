const { ReviewImage, Review, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const express = require('express');

const router = express.Router();

router.delete("/:imageId",
    requireAuth,
    async (req, res, next) => {

        const doomedImage = await ReviewImage.findOne({ where: { id: req.params.imageId},
            attributes: ["id", "reviewId"]
        });

        if (!doomedImage) return res.status(404).json({ message: "Spot Image couldn't be found" });

        const reviewId = doomedImage.reviewId;
        const review = await Review.findByPk(reviewId);

        if (review.userId === req.user.id) {
            await doomedImage.destroy();
            return res.json({ message: "Successfully deleted" });
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
})

module.exports = router;
