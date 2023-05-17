const mongoUtil = require('../utils/mongodb')
const { getUserFromMongoDB } = require('./index')
jest.mock('../utils/mongodb', () => ({
  getDB: jest.fn(() => ({
    collection: jest.fn(() => ({
      find: jest.fn(() => ({
        toArray: jest.fn(callback => {
          callback(null, [{ name: 'John Doe', age: 30 }])
        })
      }))
    }))
  }))
}))
describe('getUserFromMongoDB', () => {
  it('should retrieve users from MongoDB collection', done => {
    // const callback = jest.fn((results) => {
    //   expect(results).toEqual([{ name: "John Doe", age: 30 }]);
    //   done();
    // });
    // getUserFromMongoDB(callback);
    getUserFromMongoDB(results => {
      expect(results).toEqual([{ name: 'John Doe', age: 30 }])
      done()
    })
  })
})
