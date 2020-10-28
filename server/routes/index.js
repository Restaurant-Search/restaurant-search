const express = require("express")
const router = express.Router()
const restaurantRouter = require("./restaurants")
const userRouter = require("./users")

router.use("/restaurant", restaurantRouter)
router.use("/", userRouter)

module.exports = router