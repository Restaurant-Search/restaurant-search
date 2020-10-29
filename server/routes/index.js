const express = require("express")
const router = express.Router()
const userRouter = require("./users")
const zomatoRouter = require("./zomato")
const weatherRouter = require("./weather")

router.use("/", userRouter)
router.use("/", zomatoRouter)
router.use("/", weatherRouter)

module.exports = router