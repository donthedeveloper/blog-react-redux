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
        it('returns a status code of 201 on successful signup', (done) => {
            const testEmail = 'thisisprobablynottaken@kappa.com';
            chai.request(app)
                .post('/')
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    Subscriber.destroy({where:{email:testEmail}});
                    done();
            });
        })
    });
});