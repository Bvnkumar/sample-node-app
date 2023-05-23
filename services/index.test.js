const { getUserFromMongoDB, getUser } = require('./index')
pool = jest.fn(() => ({}))
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
describe('getUser', () => {
  it('should retrive the user data from the database', done => {
    const mockCallback = jest.fn((error, data) => {
      expect(error).toBeNull()
      expect(data).toBe(mockResults)
      done()
    })
    const mockResults = ['user1', 'user2']
    pool.query = jest.fn((query, callback) => {
      callback(null, mockResults)
    })
    getUser(mockCallback)
  })
})
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
