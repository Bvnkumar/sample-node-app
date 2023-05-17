const mongoUtil = require('../utils/mongodb')
exports.getUser = callback => {
  pool.query('SELECT * from  emp', function (error, results, fields) {
    if (error) callback(error)
    log.info('Result ', results)
    callback(null, 'test')
  })
}

exports.getUserFromMongoDB = callback => {
  const db = mongoUtil.getDB()
  const collection = db.collection('users')
  collection.find({}).toArray((err, results) => {
    callback(results)
  })
}
