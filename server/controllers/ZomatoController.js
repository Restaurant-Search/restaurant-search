const axios = require('axios')

class ZomatoController {
  static showZomatoCities(req, res, next) {
    axios({
      "method": "GET",
      "url": "https://developers.zomato.com/api/v2.1/cities",
      "headers": {
        "Accept": "application/json",
        "user-key": process.env.ZOMATO
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

  static showZomatoEstablishment(req, res, next) {
    axios({
      "method": "GET",
      "url": "https://developers.zomato.com/api/v2.1/establishments",
      "headers": {
        "Accept": "application/json",
        "user-key": process.env.ZOMATO
      },
      "params": {
        // ini diubah sesuai params yang dimasukin oleh user
        "city_id": req.body.city_id
      }
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch((error) => {
        res.status(500).json(error)
      })
  }

  static showZomatoSearch(req, res, next) {
    axios({
      "method": "GET",
      "url": "https://developers.zomato.com/api/v2.1/search",
      "headers": {
        "Accept": "application/json",
        "user-key": process.env.ZOMATO
      },
      "params": {
        // ini diubah sesuai params yang sudah ada sesuai dengan city dan establisment
        "entity_id": req.body.entity_id,
        "entity_type": req.body.entity_type,
        "establishment_type": req.body.establishment_type,
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



module.exports = ZomatoController