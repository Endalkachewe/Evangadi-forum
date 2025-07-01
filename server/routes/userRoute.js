// const express = require('express');
// const router = express.Router()


// // register route
// router.post("/register", (req, res) => {
//     res.send("register user")
// })

// // login user
// router.post("/login", (req, res) => {
//     res.send("login user")
// })

// // check user
// router.get("/check", (req, res) => {
//     res.send("check user")
// })

// module.exports = router;

const express = require('express');
const router = express.Router()

// user controllers
const { register, login, checkUser } = require('../controller/userController');
//auth middleware authentication
const authMiddleware = require('../middleware/authMiddleware');

// register route
router.post("/register", register)

// login user
router.post("/login", login)

// check user
router.get("/checkUser",authMiddleware, checkUser)

module.exports = router

