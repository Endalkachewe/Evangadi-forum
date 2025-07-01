const express = require('express');
const router = express.Router()

// authontication middleware
// const authMiddleware = require('../middleware/authMiddleware')

router.get("/all-questions", (req, res) => {
    res.send("all questions")
})

module.exports = router;