const axios = require('axios')

class WeatherController {
  static getWeather(req, res, next) {
    axios({
      "method": "GET",
      "url": "https://community-open-weather-map.p.rapidapi.com/weather",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "6ed05a76b8msha9266fffc10329dp198415jsne0edd2cc2310",
        "useQueryString": true
      },
      "params": {
        "q": req.body.q
      }
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  }
}



module.exports = WeatherController 