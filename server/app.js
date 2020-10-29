require("dotenv").config()

const cors = require("cors")
const express = require("express")
const app = express()
const port = +process.env.PORT
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log("http://localhost:" + port)
})

