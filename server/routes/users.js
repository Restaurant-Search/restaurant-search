const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")

router.post("/register", UserController.postRegister)
router.post("/login", UserController.postLogin)
<<<<<<< HEAD
router.post('/googlelogin', UserController.googleLogin) 
=======
router.post('/googleLogin', UserController.googleLogin)
>>>>>>> 1475d6ca988ce323384f2f2c20b3a83772133c2b

module.exports = router