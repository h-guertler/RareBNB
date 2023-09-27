const express = require("express");

const { Spot } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

module.exports = router;
