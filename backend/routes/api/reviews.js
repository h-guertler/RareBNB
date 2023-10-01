const { Review, ReviewImage, User, Spot } = require("../../db/models");
const express = require('express');
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get("/current",
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const myReviews = await Review.findAll({where: { userId: userId },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "firstName", "lastName"],
                },
                {
                    model: ReviewImage,
                as: "ReviewImages",
                attributes: ["id", "url"]
                },
            ],
        }
    );

    return res.json({ myReviews });
});

router.post("/:reviewId/images",
    requireAuth,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const review = await Review.findByPk(reviewId);
        if (review && req.user.id === review.userId) {
            const { url } = req.body;
            const newImg = await ReviewImage.create({reviewId, url});
            const imgRep = {};
            imgRep.id = newImg.id;
            imgRep.url = newImg.url
            return res.json(imgRep);
        }
});

router.put("/:reviewId",
    requireAuth,
    async (req, res, next) => {
        const review = await Review.findOne({where: {
            id: req.params.reviewId
        }});

        if (review && review.userId === req.user.id) {
            review.id = req.params.reviewId;
            review.userId = req.user.id;
            review.spotId = review.spotId;
            review.stars = req.body.stars;
            review.review = req.body.review;
            review.createdAt = review.createdAt;
            review.updatedAt = new Date();
        }

    return res.json(review);
});

router.delete("/:reviewId",
    requireAuth,
    async (req, res, next) => {
        const doomedReview = await Review.findByPk(req.params.reviewId);

        if (!doomedReview) return res.status(404).json({ message: "Review couldn't be found" });
        if (doomedReview.userId === req.user.id) {
            await doomedReview.destroy();
            return res.json({ message: "Successfully deleted"});
        }
});


module.exports = router;
