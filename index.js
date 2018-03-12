const axios = require('axios')

async function sendMessage() {
  try {
    const response = await axios.get('http://echo-service:50000')
    console.log('***', response.data)
  } catch (err) {
    console.log('***error', err)
  }
}

setInterval(sendMessage, 5000)
