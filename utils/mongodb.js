var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb;
function connect(callback) {
  MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, (err, db) => {
    mongodb = db;
    callback();
  });
}
function get() {
  return mongodb;
}
function close() {
  mongodb.close();
}
module.exports = {
  connect,
  get,
  close,
};
