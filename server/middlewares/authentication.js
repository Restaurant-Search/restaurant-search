const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

function authentication(req, res, next) {
  const { token } = req.headers

  if (!token) {
    throw { name: "Authentication Failed", status: 401 }
  } else {
    const decoded = verifyToken(token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "Authentication Failed", status: 401 }
        } else {
          req.loggedInUser = decoded
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = authentication