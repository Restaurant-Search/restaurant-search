require("dotenv").config()

const cors = require('cors')
const express = require("express")
const app = express()
const port = +process.env.PORT
<<<<<<< HEAD
// const cors = require("cors")
=======
>>>>>>> 68fde2bd9e4c08929d20eeded63b8553bc8ae4ff
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

