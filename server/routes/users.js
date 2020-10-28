const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const ZomatoController = require("../controllers/ZomatoController")

router.post("/register", UserController.postRegister)
router.post("/login", UserController.postLogin)

router.get("/restaurant/city", ZomatoController.showZomatoCities)
router.get("/restaurant/establishment", ZomatoController.showZomatoEstablishment)
router.get("/restaurant/search", ZomatoController.showZomatoSearch)

module.exports = router