const { ReviewImage, Review } = require("../../db/models");
const express = require('express');

const router = express.Router();

router.delete("/:imageId", async (req, res, next) => {
    const doomedImage = await ReviewImage.findByPk(req.params.imageId);

    if (doomedImage) {
        const review = await Review.findByPk(doomedImage.reviewId);
        if (review.userId === req.user.id) {
            await doomedImage.destroy();
            return res.status(200).json({ message: "Successfully deleted" });
        }
        // add an else for what to do if no logged in user
        // and if logged in user is incorrect
    } else {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }
    return res.json({ message: "this is delete /:imageId" });
});

module.exports = router;
