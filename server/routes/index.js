const express = require("express")
const router = express.Router()
const userRouter = require("./users")
const zomatoRouter = require("./zomato")

router.use("/", userRouter)
router.use("/", zomatoRouter)

module.exports = router