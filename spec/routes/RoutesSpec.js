const request = require('supertest');
// const app = require('../../app');
// const router = express.Router();
const app = 'http://localhost:3001';

describe('/', () => {
  describe('GET request', () => {
    it('returns a status code of 200', (done) => {
      request(app)
        .get('/')
        .expect(200)
        // .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error) => (error) ? done.fail(error) : done());
    });
  });

  describe('POST request', () => {
    it('returns a status code of 201 on successful signup', (done) => {
      const testEmail = 'thisisprobablynottaken@kappa.com';
      request(app)
        .post('')
        .send({ email: testEmail })
        .expect(201)
        .end((error) => {
          if (error) {
            done.fail(error);
          } else {
            // Subscriber.destroy({where:{email:testEmail}});
            return done();
          }
        });
    })
  })
});

