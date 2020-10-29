const express = require('express')
const router = express()
const WeatherController = require('../controllers/WeatherController')

router.get('/', WeatherController.getWeather)

module.exports = router 