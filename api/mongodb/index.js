const mongoose = require('mongoose')
// const config = require("../../config")
// const url = config.MONGODB_CONNECT_URL
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
// mongoose.connect(url,options)
mongoose.connect(
  'mongodb+srv://user1:rakus2098@cluster0.rpec9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  options
)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose
