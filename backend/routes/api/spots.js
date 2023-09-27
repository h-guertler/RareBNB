const express = require("express");

const { Spot, Review, SpotImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// const validateSpotImage = [
//     check("url")
//         .exists({ checkFalsy: true })
//         .withMessage(""),
//     check("preview")
//         .exists({ checkFalsy: true })
//         .withMessage(),
//     handleValidationErrors
// ];

const router = express.Router();

router.get("/:spotId/bookings", async (req, res, next) => {
    return res.json({ message: "this is get /:spotId/bookings" });
});

router.post("/:spotId/bookings", async (req, res, next) => {
    return res.json({ message: "this is post /:spotId/bookings"});
});

router.get("/:spotId/reviews", async (req, res, next) => {
    return res.json({ message: "this is get /:spotId/reviews" });
});

router.post("/:spotId/reviews", async (req, res, next) => {
    return res.json({ message: "this is post /:spotId/reviews" });
});

router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const reviews = await Review.findAll({ where:
    {
        spotId: spot.id,
    }});
    const reviewCount = reviews.length;

    let sum = 0;
    reviews.forEach(review => {
        sum+= review.stars;
    });

    spot.avgRating = sum;

    const previewImg = await SpotImage.findOne({ where: {
        spotId: spot.id,
        preview: true,
    }})

    spot.previewImage = previewImg.url;

    return res.json(spot);
});

router.get("/current", async (req, res, next) => {
    return res.json({ message: "this is get /current" });
});

router.post("/:spotId/images", async (req, res, next) => {
    return res.json({ message: "this is post /:spotId/images" });
});

router.put("/:spotId", async (req, res, next) => {
    return res.json({ message: "this is put /:spotId" });
});

router.delete("/:spotId", async (req, res, next) => {
    return res.json({ message: "this is delete /:spotId" });
});

router.get("/", async (req, res, next) => {
    // find a way to get reviews by spotId
    // then attach this aggregate to the spots
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

router.post("/", async (req, res, next) => {
    return res.json({ message: "this is post /"});
});

module.exports = router;
