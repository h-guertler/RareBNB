const { Review, ReviewImage, SpotImage, User, Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const express = require('express');
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .custom(value => value >= 1 && value <= 5)
        .isInt()
        .withMessage("Stars must be an integer from 1 to 5"),
        handleValidationErrors
]

router.get("/current",
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const Reviews = await Review.findAll({ where: { userId: userId },
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "firstName", "lastName"],
                },
                {
                    model: Spot,
                    as: "Spot",
                    attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"]
                },
                {
                    model: ReviewImage,
                    as: "ReviewImages",
                    attributes: ["id", "url"]
                },
            ],
        }
    );

    for (const review of Reviews) {
        const spot = await Spot.findByPk(review.Spot.id);
        const prevImg = await SpotImage.findOne({ where: { spotId: spot.id }})
        spot.previewImage = prevImg.url;
    }

    return res.json({ Reviews });
});

router.post("/:reviewId/images",
    requireAuth,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const review = await Review.findByPk(reviewId);
        if (!review) return res.status(404).json({ message: "Review couldn't be found" });

        if (req.user.id === review.userId) {
            const existingImages = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId },
                attributes: [ "id", "reviewId", "url", "createdAt", "updatedAt"]
            });

            if (existingImages.length < 10 ) {
                const { url } = req.body;
                const newImg = await ReviewImage.create({reviewId, url});
                const imgRep = {};
                imgRep.id = newImg.id;
                imgRep.url = newImg.url

            return res.json(imgRep);
            } else {
                return res.status(403).json({ message: "Maximum number of images for this resource was reached"})
            }
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
});

router.put("/:reviewId",
    requireAuth,
    validateReview,
    async (req, res, next) => {
        const review = await Review.findOne({ where: { id: req.params.reviewId }});

        if (!review) return res.status(404).json({ message: "Review couldn't be found" });

        if (review.userId === req.user.id) {
            review.id = review.id;
            review.userId = review.userId;
            review.spotId = review.spotId;
            review.stars = req.body.stars;
            review.review = req.body.review;
            review.createdAt = review.createdAt;
            review.updatedAt = new Date();
        } else {
            return res.status(403).json({ message: "Forbidden"} );
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
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
});


module.exports = router;
