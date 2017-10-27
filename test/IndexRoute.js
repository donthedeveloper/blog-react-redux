var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);
var {Subscriber} = require('../server/models');

describe('\'/\' Route', function() {
    describe('GET Request', function() {
        it('responds with status 200', function(done) {
            chai.request(app)
                .get('/')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST Request', () => {
        it('returns a status code of 201 on successful signup with subscription', (done) => {
            const testEmail = 'thisisprobablynottaken@kappa.com';
            chai.request(app)
                .post('/')
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    // Subscriber.destroy({where:{email:testEmail}});
                    done();
            });
        });

        // TODO: 422 is inconsistent with other duplication errors
        it ('returns a status code of 422 on email already taken with subscription', (done) => {
            const testEmail = 'thisisprobablynottaken@kappa.com';
            chai.request(app)
                .post('/')
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
                .post('/')
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});