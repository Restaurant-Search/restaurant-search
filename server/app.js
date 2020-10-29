require("dotenv").config()

<<<<<<< HEAD
const cors = require('cors')
=======
const cors = require('cors')
>>>>>>> cd3ca25e926110ca453432560ba1a7c529882aaa
const express = require("express")
const app = express()
const port = +process.env.PORT
const cors = require("cors")
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

