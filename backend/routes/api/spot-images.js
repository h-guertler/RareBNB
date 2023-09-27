const { SpotImage } = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", async (res, res, next) => {
    return res.json({ message: "this is delete /:imageId" });
});

module.exports = router;
