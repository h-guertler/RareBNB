const { Booking, Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const express = require('express');

const router = express.Router();

router.get("/current",
    requireAuth,
    async (req, res, next) => {
        const Bookings = await Booking.findAll({ where: { userId: req.user.id },
            include: [
                {
                model: Spot,
                as: "Spot",
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"]
                }
            ]
        });

        for (const booking of Bookings) {
            const spot = await Spot.findByPk(booking.spotId);
            const spotImage = await SpotImage.findOne({ where: {
                preview: true,
                spotId: spot.id,
            }});

            if (spotImage) {
                booking.Spot.previewImage = spotImage.url;
            }
        }
    return res.json({ Bookings });
});


router.put("/:bookingId",
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const booking = await Booking.findByPk(req.params.bookingId);

        if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });

        if (booking.userId === userId) {
            const { startDate, endDate } = req.body;
            booking.startDate = startDate;
            booking.endDate = endDate;
            return res.json(booking);
        }
});

router.delete("/:bookingId",
    requireAuth,
    async (req, res, next) => {
        const doomedBooking = await Booking.findByPk(parseInt(req.params.bookingId));

        if (!doomedBooking) return res.status(404).json({ message: "Booking couldn't be found" });

        const spot = Spot.findByPk(doomedBooking.spotId);

        if ((doomedBooking.userId = req.user.id) || (spot.ownerId = req.user.id)) {
            await doomedBooking.destroy();
            return res.json({ message: "Successfully deleted" });
        }

        return res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
