const mongoUtil = require('../utils/mongodb')
exports.getUser = callback => {
  console.log('in the index users service')
  pool.query('SELECT * from users', function (error, results, fields) {
    if (error) callback(error, null)
    console.log('error ', error)
    callback(null, results)
  })
}

exports.getUserFromMongoDB = callback => {
  const db = mongoUtil.getDB()
  const collection = db.collection('users')
  collection.find({}).toArray((err, results) => {
    callback(results)
  })
}
