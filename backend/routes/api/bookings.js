const { Booking } = require("../../db/models");

const router = express.Router();

router.get("/current", async (req, res, next) => {
    return res.json({ message: "this is get /current" });
});

router.put("/:bookingId", async (req, res, next) => {
    return res.json({ message: "this is /:bookingId"} );
});

router.delete("/:bookingId", async (req, res, next) => {
    return res.json({ message: "this is /:bookingId" });
});

module.exports = router;
