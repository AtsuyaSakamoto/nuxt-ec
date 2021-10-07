const mongoose = require('mongoose')
// const config = require('../../config')
// const url = config.MONGODB_CONNECT_URL
// const $config = require('../../nuxt.config')
// const url = $config.process.env.mongodbConnect
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
mongoose.connect(process.env.mongodbConnect, options)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose
