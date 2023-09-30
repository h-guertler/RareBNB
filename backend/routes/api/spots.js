const express = require("express");

const { Spot, Review, SpotImage, User, ReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

// const validateSpotImage = [
//     check("url")
//         .exists({ checkFalsy: true })
//         .withMessage(""),
//     check("preview")
//         .exists({ checkFalsy: true })
//         .withMessage(),
//     handleValidationErrors
// ];

const calculateAvgRating = async spotId => {
    const spot = await Spot.findByPk(spotId);
    const reviews = await Review.findAll({ where:
    {
        spotId: spotId,
    }});
    const reviewCount = reviews.length;

    let sum = 0;
    reviews.forEach(review => {
        sum+= review.stars;
    });

    return sum / reviewCount;
};

const calculateNumReviews = async spotId => {
    const reviews = await Review.findAll({ where:
        {
            spotId: spotId,
        }});
       return reviews.length;
};

const router = express.Router();

router.post("/:spotId/images",
requireAuth,
async (req, res, next) =>{
    const spot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body;
    const spotId = req.params.spotId;

    const newImage = await SpotImage.create({ spotId, url, preview });

    const imageRep  = {};
    imageRep.id = newImage.id;
    imageRep.url = newImage.url;
    imageRep.preview = newImage.preview;

    return res.json(imageRep);
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
    return res.json({ message: "this is get /:spotId/bookings" });
});

router.post("/:spotId/bookings", async (req, res, next) => {
    return res.json({ message: "this is post /:spotId/bookings"});
});

router.get("/:spotId/reviews", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) res.status(404).json({ message: "Spot couldn't be found" });

    const reviews = await Review.findAll({ where: {
        spotId: spot.id
    },
    include: [
        { model: User,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName']
        },
        { model: ReviewImage,
            as: 'ReviewImages',
            attributes: ['id', 'url']
        }
    ]
    })
    return res.json(reviews);
});

router.post("/:spotId/reviews", async (req, res, next) => {
    return res.json({ message: "this is post /:spotId/reviews" });
});

router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    spot.avgRating = await calculateAvgRating(spot.id);

    const previewImg = await SpotImage.findOne({ where: {
        spotId: spot.id,
        preview: true,
    }});

    spot.previewImage = previewImg.url;

    spot.numReviews = await calculateNumReviews(spot.id);

    spot.SpotImages = [];

    const spotImages = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: {
            spotId: spot.id
        }
    });
    spotImages.forEach(image => spot.SpotImages.push(image));

    const ownerUser = await User.findByPk(spot.ownerId);

    spot.Owner = {};
    spot.Owner.id = ownerUser.id;
    spot.Owner.firstName = ownerUser.firstName;
    spot.Owner.lastName = ownerUser.lastName;

    return res.json(spot);
});

router.get("/current", requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const mySpots = await Spot.findAll({
        where: {
            ownerId: userId,
        },
        attributes: {
            exclude: [ 'Owner', 'numReviews', 'SpotImages' ]
        }
    });
    for (let i = 0; i < mySpots.length; i++) {
        const spot = mySpots[i];
        spot.avgRating = await calculateAvgRating(spot.id);

        const previewImg = await SpotImage.findOne({ where: {
            spotId: spot.id,
            preview: true
        }});
        if (previewImg) spot.previewImage = previewImg.url;
    }
    res.json(mySpots)
});

router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            exclude: [ 'Owner', 'numReviews', 'SpotImages' ]
        }
    });
    for (let i = 0; i < allSpots.length; i++) {
        const spot = allSpots[i];
        spot.avgRating = await calculateAvgRating(spot.id);

        const previewImg = await SpotImage.findOne({ where: {
            spotId: spot.id,
            preview: true
        }});
        if (previewImg) spot.previewImage = previewImg.url;
    }

    res.json(allSpots);
});

router.post("/", async (req, res, next) => {
    const { address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price } = req.body;
        const ownerId = req.user.id;
        const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });


    // then return w all above fields -- now w id, CA, UA

    return res.json(spot);
});

module.exports = router;
