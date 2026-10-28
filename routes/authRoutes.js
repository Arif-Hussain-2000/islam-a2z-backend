const express = require("express");
const {adminLogin} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")
const router = express.Router();
router.post("/login",adminLogin);
router.get("/me", protect, (req, res) => {

    res.json({
        message: "Admin authenticated",
        admin: req.admin
    });

});
module.exports = router;