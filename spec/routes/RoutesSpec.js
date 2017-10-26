const request = require('supertest');
// const app = require('../../app');
// const router = express.Router();

describe('Server', () => {
  describe('GET index route', () => {
    it('returns a status code of 200', (done) => {
      request('http://localhost:3001/')
        .get('')
        .expect(200)
        // .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error) => (error) ? done.fail(error) : done());
    });
  });
});

// describe('GET /user', function() {
//   it('respond with json', function(done) {
//     request('http://localhost:3001/')
//       .get('/asdfasdf')
//       // .set('Accept', 'application/json')
//       // .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });