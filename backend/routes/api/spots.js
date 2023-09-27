const express = require("express");

const { Spot } = require("../../db/models");

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
    return res.json({ message: "this is get /:spotId" });
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
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

router.post("/", async (req, res, next) => {
    return res.json({ message: "this is post /"});
});

module.exports = router;
