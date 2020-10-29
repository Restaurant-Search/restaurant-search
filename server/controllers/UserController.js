const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static postRegister(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(payload)
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static postLogin(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: payload.email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "Wrong Email/Password", status: 401 }
        } else if (!comparePassword(payload.password, data.password)) {
          throw { name: "Wrong Email/Password", status: 401 }
        }
        const access_token = signToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
  static googleLogin(req, res, next) {
    //verify token
    //dapetin token dari client
    let { google_access_token } = req.body
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ''
    //verify google token berdasarkan client id
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return User.findOne({ where: { email: payload.email } })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          var userObj = {
            email,
            password: 'randomaja'
          }
          return User.create(userObj)
        }
      })
      .then(dataUser => {
        let access_token = signToken({ id: dataUser.id, email: dataUser.email })
        return res.status(200).json({ access_token })
      })
      .catch(err => {
        res.status(401).json(err.message)
      })
  }
}

module.exports = UserController