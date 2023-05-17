var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
let mongodb
function connect (callback) {
  console.log('in the connection begining')
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongodb = client.db('mydb1')
      console.log('in the connection')
      callback(err)
    }
  )
}
function getDB () {
  return mongodb
}
function close () {
  mongodb.close()
}
module.exports = {
  connect,
  getDB,
  close
}
