const { Review } = require("../../db/models");
const express = require('express');

const router = express.Router();

router.post("/:reviewId/images", async (req, res, next) => {
    return res.json({ message: "this is post /:reviewId/images"})
});

router.put("/:reviewId", (req, res, next) => {
    return res.json("this is put /:reviewId");
});

router.delete("/:reviewId", (req, res, next) => {
    return res.json("this is delete /:reviewId");
});

router.get("/current", async (req, res, next) => {
    return res.json({ message: " this is get /current" });
});

module.exports = router;
