const mongoose = require('mongoose')
const config = require('config')
const dbUrl = config.get('ourMongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV !== 'production'
        ? process.env.ourMongoURI
        : process.env.mongoURI,
      {
        // added to avoid bugs
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      {    autoIndex :true 
      }
    )

    console.log('MongoDB is connected!')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
//mehroz:mehroz1122@cluster0-shard-00-00.odl4g.mongodb.net:27017,cluster0-shard-00-01.odl4g.mongodb.net:27017,cluster0-shard-00-02.odl4g.mongodb.net:27017/main?ssl=true&replicaSet=atlas-vanfqo-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = connectDB
