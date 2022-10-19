const expect = require('chai').expect
const request = require('request')

describe('/users API testing', () => {
  it('/users status code', (done) => {
    request('http://localhost:3000/users', (err, result, body) => {
      expect(result.statusCode).to.equal(200)
      expect(body).to.equal(JSON.stringify({ previous: { page: 'None', limit: 'None' }, next: { page: 2, limit: 3 }, users: [{ id: '1', user: 'user1' }, { id: '2', user: 'user2' }, { id: '3', user: 'user3' }] }))
      done()
    })
  })
  it('/users1 status code 404', (done) => {
    request('http://localhost:3000/users1', (err, result, body) => {
      expect(result.statusCode).to.equal(404)
      done()
    })
  })
  it('/users2 status code 404', (done) => {
    request('http://localhost:3000/users1', (err, result, body) => {
      expect(result.statusCode).to.equal(404)
      done()
    })
  })
})
