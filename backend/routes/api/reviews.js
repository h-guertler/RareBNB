const { Review, ReviewImage } = require("../../db/models");
const express = require('express');
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.post("/:reviewId/images",
    requireAuth,
    async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    console.log("rev : " + review)
    if (review) {
        const { url } = req.body;
        const reviewId = req.params;
        const newImg = await ReviewImage.create({ reviewId, url });
        const imageRep = {};
        imageRep.id = newImg.id;
        imageRep.url = newImg.url;
        return res.json(imageRep);
    } else {
        return res.json({ message: "Review couldn't be found"});
    }
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
