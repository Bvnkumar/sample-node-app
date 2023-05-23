var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
let mongodb
function connect (callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongodb = client.db('mydb1')
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
