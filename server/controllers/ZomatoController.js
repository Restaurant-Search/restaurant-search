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
        "q": req.query.q

      }
    })
      .then(({ data }) => {
        // const city_id = data.location_suggestions[0].id
        res.status(200).json(data.location_suggestions[0])
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
        "city_id": req.query.city_id
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
        "entity_id": req.query.entity_id,
        "entity_type": "city",
        "establishment_type": req.query.establishment_type,
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