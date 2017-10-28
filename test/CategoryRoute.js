var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);

var {Subscriber} = require('../server/models');

describe('\'/:category\'', function() {
    const categoryThatExists = 'design';
    const categoryThatDoesNotExist = 'thiscategorydoesnotexist';

    describe('GET request', function() {
        it('responds with status code 200 when category exists', function(done) {
            chai.request(app)
                .get(`/${categoryThatExists}`)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        })

        it('responds with status code 404 when category does not exist', function(done) {
            chai.request(app)
            .get(`/${categoryThatDoesNotExist}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
        })
    });

    describe('POST request', function() {
        // assumes error for category check gets returned before subscriber checks do
        it('responds with a status code of 404 if category DOES NOT exist', function(done) {
            chai.request(app)
                .post(`/${categoryThatDoesNotExist}`)
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });            
        })

        it('returns a status code of 201 on successful signup with subscription', (done) => {
            const testEmail = 'thisisprobablynottakencategory@kappa.com';
            chai.request(app)
                .post(`/${categoryThatExists}`)
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it ('returns a status code of 422 on email already taken with subscription', (done) => {
            const testEmail = 'thisisprobablynottakencategory@kappa.com';
            chai.request(app)
                .post(`/${categoryThatExists}`)
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    Subscriber.destroy({where:{email:testEmail}});
                    done();
                });
        });

        it ('returns a status code of 400 on invalid email with subscription', (done) => {
            const testEmail = 'thisisprobablynottaken';
            chai.request(app)
                .post(`/${categoryThatExists}`)
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    })
});