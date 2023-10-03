const express = require("express");

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

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

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat")
        .exists({ checkFalsy: true })
        .isDecimal()
        .custom(value => value >= -90 && value <= 90)
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({ checkFalsy: true })
        .isDecimal()
        .custom(value => value >= -180 && value <= 180)
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .custom(
            checkPriceIsPositive = value => value > 0)
        .withMessage("Price per day is required"),
    handleValidationErrors
]

router.get("/current",
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const Spots = await Spot.findAll({
            where: {
                ownerId: userId,
            },
            attributes: {
                exclude: [ 'Owner', 'numReviews', 'SpotImages' ]
            }
        });
        for (let spot of Spots) {
            spot.avgRating = await calculateAvgRating(spot.id);

            const previewImg = await SpotImage.findOne({ where: {
                spotId: spot.id,
                preview: true
            }});
        if (previewImg) spot.previewImage = previewImg.url;
        }
        res.json({ Spots });
});

router.post("/:spotId/images",
    requireAuth,
    async (req, res, next) =>{
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
        const spotOwnerId = spot.ownerId;
        if (req.user.id !== spotOwnerId) return res.status(403).json({ message: "Forbidden" });

        const { url, preview } = req.body;
        const spotId = req.params.spotId;

        const newImage = await SpotImage.create({ spotId, url, preview });

        const imageRep  = {};
        imageRep.id = newImage.id;
        imageRep.url = newImage.url;
        imageRep.preview = newImage.preview;

    return res.json(imageRep);
});

router.get("/:spotId/bookings",
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);
        if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

        if (spot.ownerId === userId) {
            const Bookings = await Booking.findAll({ where: { spotId: spotId },
                include: {
                    model: User,
                    as: "User",
                    attributes: ["id", "firstName", "lastName"]
                }
            });
            return res.json(Bookings);
        }

        const Bookings = await Booking.findAll({ where: {
            userId: userId,
            spotId: spotId
          },
          attributes: ["spotId", "startDate", "endDate"]
        });

        return res.json({ Bookings });
});

router.post("/:spotId/bookings",
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

        const userId = req.user.id;

        if (spot.ownerId !== userId) {
            const spotId = spot.id;
            const { startDate, endDate } = req.body;
            const newBooking = await Booking.create({ userId, spotId, startDate, endDate });
            return res.json(newBooking);
        } else {
            return res.status(403).json({ message: "Forbidden" })
        }
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

router.post("/:spotId/reviews",
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) return res.json({ message: "Spot couldn't be found" });
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const { review, stars } = req.body;
        const newReview = await Review.create({ userId, spotId, review, stars });
    return res.json(newReview);
});

router.put("/:spotId",
    requireAuth,
    validateSpot,
    async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    const spotOwnerId = spot.ownerId;
    if (req.user.id !== spotOwnerId) return res.status(403).json({ message: "Forbidden" });

    spot.address = req.body.address;
    spot.city = req.body.city;
    spot.state = req.body.state;
    spot.country = req.body.country;
    spot.lat = req.body.lat;
    spot.lng = req.body.lng;
    spot.name = req.body.name;
    spot.description = req.body.description;
    spot.price = req.body.price;

    //"avgRating": null "previewImage": null, "numReviews": null, "SpotImages": null, "Owner": null,
    const repSpot = {};
    repSpot.id = spot.id;
    repSpot.ownerId = spot.ownerId;
    repSpot.address = spot.address;
    repSpot.city = spot.city;
    repSpot.state = spot.state;
    repSpot.country = spot.country;
    repSpot.lat = spot.lat;
    repSpot.lng = spot.lng;
    repSpot.name = spot.name;
    repSpot.description = spot.description;
    repSpot.price = spot.price;
    repSpot.createdAt = spot.createdAt;
    repSpot.updatedAt = spot.updatedAt;

    return res.json(repSpot);
});

router.delete("/:spotId",
    requireAuth,
    async (req, res, next) => {
        const doomedSpot = await Spot.findByPk(req.params.spotId);

        if (!doomedSpot) return res.status(404).json({ message: "Spot couldn't be found" });

        if (req.user.id === doomedSpot.ownerId) {
            await doomedSpot.destroy();
            return res.json({ message: "Successfully deleted"})
        }

        return res.status(403).json({ message: "Forbidden" });
    });

router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    spot.avgRating = await calculateAvgRating(spot.id);

    const previewImg = await SpotImage.findOne({ where: {
        spotId: spot.id,
        preview: true,
    }});

    if (previewImg) spot.previewImage = previewImg.url;

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

router.get("/", async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            exclude: [ 'Owner', 'numReviews', 'SpotImages' ]
        }
    });
    for (let i = 0; i < Spots.length; i++) {
        const spot = Spots[i];
        spot.avgRating = await calculateAvgRating(spot.id);

        const previewImg = await SpotImage.findOne({ where: {
            spotId: spot.id,
            preview: true
        }});
        if (previewImg) spot.previewImage = previewImg.url;
    }

    res.json({Spots});
});

router.post("/",
    validateSpot,
    requireAuth,
    async (req, res, next) => {
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
    return res.status(201).json(spot);
});

module.exports = router;
