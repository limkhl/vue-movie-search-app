require('dotenv').config()
const axios = require('axios')
const { API_ENDPOINT } = process.env

exports.handler = async function (event) {
  const options = JSON.parse(event.body)
  const { url } = options
  const res = await axios({
    url: `${API_ENDPOINT}${url}`,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(res.data)
  }
}
