var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);

var {Subscriber} = require('../server/models');

describe('\'/:category/:post\'', function() {
    // matching category and post
    const categoryThatExists = 'coding';
    const postThatExists = 'first-week-at-fullstack-academy';

    // category that exists but doesnt match post
    const categoryThatAlsoExists = 'design';

    // category and post that do not exist
    const categoryThatDoesNotExist = 'thiscategorydoesnotexist';
    const postThatDoesNotExist = 'this-post-does-not-exist';

    describe('GET request', function() {
        it('responds with status code 200 when category and post DO exist', function(done) {
            chai.request(app)
                .get(`/${categoryThatExists}/${postThatExists}`)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        })

        it('responds with status code 404 when category DOES NOT exist, but post DOES exist', function(done) {
            chai.request(app)
            .get(`/${categoryThatDoesNotExist}/${postThatExists}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
        });

        it('responds with status code 404 when category DOES exist, but post DOES NOT exist', function(done) {
            chai.request(app)
            .get(`/${categoryThatExists}/${postThatDoesNotExist}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
        });

        it('responds with status code 404 when category DOES exist, and post DOES exists but DOES NOT match category', function(done) {
            chai.request(app)
            .get(`/${categoryThatAlsoExists}/${postThatExists}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
        });

        it ('responds with status code 404 when category DOES NOT exist, and post DOES NOT exist', function(done) {
            chai.request(app)
            .get(`/${categoryThatDoesNotExist}/${postThatDoesNotExist}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });           
        });
    });

    describe('POST request', function() {
        // assumes error for category check gets returned before subscriber checks do
        it('responds with status code 404 when category DOES NOT exist, but post DOES exist', function(done) {
            chai.request(app)
                .post(`/${categoryThatDoesNotExist}/${postThatExists}`)
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });            
        });

        // assumes error for category check gets returned before subscriber checks do
        it('responds with status code 404 when category DOES exist, but post DOES NOT exist', function(done) {
            chai.request(app)
                .post(`/${categoryThatExists}/${postThatDoesNotExist}`)
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });            
        });   
        
        // assumes error for category check gets returned before subscriber checks do
        it('responds with status code 404 when category DOES NOT exist, and post DOES NOT exist', function(done) {
            chai.request(app)
                .post(`/${categoryThatDoesNotExist}/${postThatDoesNotExist}`)
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });            
        });
        
        it('returns a status code of 201 on successful signup with subscription', (done) => {
            const testEmail = 'thisisprobablynottakencategorypost@kappa.com';
            chai.request(app)
                .post(`/${categoryThatExists}/${postThatExists}`)
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it ('returns a status code of 422 on email already taken with subscription', (done) => {
            const testEmail = 'thisisprobablynottakencategorypost@kappa.com';
            chai.request(app)
                .post(`/${categoryThatExists}/${postThatExists}`)
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
                .post(`/${categoryThatExists}/${postThatExists}`)
                .send({ email: testEmail })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});