const { Booking, Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const express = require('express');

const router = express.Router();

router.get("/current",
    requireAuth,
    async (req, res, next) => {
        const myBookings = await Booking.findAll({ where: { userId: req.user.id },
            include: [
                {
                model: Spot,
                as: "Spot",
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"]
                }
            ]
        });

        for (const booking of myBookings) {
            const spot = await Spot.findByPk(booking.spotId);
            const spotImage = await SpotImage.findOne({ where: {
                preview: true,
                spotId: spot.id,
            }});

            if (spotImage) {
                booking.Spot.previewImage = spotImage.url;
            }
        }
    return res.json(myBookings);
});


router.put("/:bookingId", async (req, res, next) => {
    return res.json({ message: "this is /:bookingId"} );
});

router.delete("/:bookingId", async (req, res, next) => {
    return res.json({ message: "this is /:bookingId" });
});

module.exports = router;
