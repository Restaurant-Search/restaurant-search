const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")

router.post("/register", UserController.postRegister)
router.post("/login", UserController.postLogin)
router.post('/googlelogin', UserController.googleLogin) 

module.exports = router