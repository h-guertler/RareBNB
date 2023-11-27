const { Booking, Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateBooking = [
    check("startDate")
        .exists({ checkFalsy: true})
        .withMessage("Start date must exist"),
    check("startDate")
        .custom(async (startDate, { req }) => {
            const spotId = req.params.spotId;
            const existingBookings = await Booking.findAll({where: {
                spotId: spotId,
                startDate: {
                    [Op.and]: [
                    { [Op.gte]: new Date(startDate) },
                    { [Op.lte]: new Date(req.params.endDate) }
                    ]
                }
            }});
            return (!existingBookings);
        })
        .withMessage("Start date conflicts with an existing booking"),
    check("endDate")
        .exists({ checkFalsy: true })
        .withMessage("End date must exist"),
    check("endDate")
        .custom(async (endDate, { req }) => {
            const spotId = req.params.spotId;
            const existingBookings = await Booking.findAll({where: {
                spotId: spotId,
                endDate: {
                    [Op.and]: [
                    { [Op.gte]: new Date(req.params.startDate) },
                    { [Op.lte]: new Date(endDate) }
                    ]
                }
            }});
            return (!existingBookings);
        })
        .withMessage("End date conflicts with an existing booking"),
    check("endDate")
        .custom((endDate, { req }) => {
            return req.body.startDate < endDate;
        })
        .withMessage("endDate cannot be on or before startDate"),
        handleValidationErrors
]

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
    validateBooking,
    async (req, res, next) => {
        const userId = req.user.id;
        const booking = await Booking.findByPk(req.params.bookingId);

        if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });

        if (new Date(booking.endDate) < new Date()) return res.status(403).json({ message: "Past bookings can't be modified" });

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

        // check to see whether it's already started
        // so, if doomedBooking.startDate to Date < new Date
        if (new Date(doomedBooking.startDate) < new Date()) {
            return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
        }

        if ((doomedBooking.userId = req.user.id) || (spot.ownerId = req.user.id)) {
            await doomedBooking.destroy();
            return res.json({ message: "Successfully deleted" });
        }

        return res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
