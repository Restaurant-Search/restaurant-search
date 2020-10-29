const express = require("express")
const router = express.Router()
const ZomatoController = require("../controllers/ZomatoController")
const authentication = require("../middlewares/authentication")

router.use(authentication)
router.get("/restaurant/city", ZomatoController.showZomatoCities,)
router.get("/restaurant/establishment", ZomatoController.showZomatoEstablishment)
router.get("/restaurant/search", ZomatoController.showZomatoSearch)

module.exports = router