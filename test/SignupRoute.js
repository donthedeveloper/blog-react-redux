var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);
var {User} = require('../server/models');

describe('\'/signup\'', function() {
    describe('GET Request', function() {
        it('responds with status 200', function(done) {
            chai.request(app)
                .get('/signup')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST Request', function() {
        it('responds with status 400 when password is not sent', function(done) {
            chai.request(app)
                .post('/signup')
                .send({
                    email: 'thisisprobablynottaken@kappa.com', 
                    firstName: 'I am', 
                    lastName: 'Kappa'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('responds with status 400 when password is null', function(done) {
            chai.request(app)
                .post('/signup')
                .send({
                    email: 'thisisprobablynottaken@kappa.com', 
                    password: null, 
                    firstName: 'I am', 
                    lastName: 'Kappa'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('responds with status 400 when password is empty string', function(done) {
            chai.request(app)
                .post('/signup')
                .send({
                    email: 'thisisprobablynottaken@kappa.com', 
                    password: '', 
                    firstName: 'I am', 
                    lastName: 'Kappa'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('responds with status 400 when email is invalid', function(done) {
            chai.request(app)
                .post('/signup')
                .send({
                    email: 'thisisprobablynottaken', 
                    password: 'asdfasdf', 
                    firstName: 'I am', 
                    lastName: 'Kappa'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('redirects when user is successfully created', function(done) {
            const testEmail = 'thisisprobablynottaken@kappa.com';
            chai.request(app)
                .post('/signup')
                .send({
                    email: testEmail, 
                    password: 'testpassword', 
                    firstName: 'I am', 
                    lastName: 'Kappa'
                })
                .end(function(err, res) {
                    expect(res).to.redirect;
                    User.destroy({where:{email:testEmail}});
                    done();
                });
        });
    });
});