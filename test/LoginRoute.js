var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);

var {User} = require('../server/models');

describe('\'/login\'', function() {
    describe('GET request', function() {
        it('responds with status code 200', function(done) {
            chai.request(app)
                .get(`/login`)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST request', function() {
        const testAdminEmail = 'test@test.com'; // TODO: before pushed to production, enter this as env variables
        const testAdminPassword = 'test'; // TODO: before pushed to production, enter this as env variables

        const invalidTestAdminEmail = 'thisemaildoesnotexist@test.com'; // TODO: before pushed to production, enter this as env variables
        const invalidTestAdminPassword = 'thispasswordisincorrect'; // TODO: before pushed to production, enter this as env variables

        it('redirects when user signs in successfully', function(done) {
            chai.request(app)
                .post('/login')
                .type('form')
                .send({
                    username: testAdminEmail, 
                    password: testAdminPassword, 
                })
                .end(function(err, res) {
                    expect(res).to.redirect;
                    done();
                });
        });

        it('response has cookie when user signs in successfully', function(done) {
            chai.request(app)
                .post('/login')
                .type('form')
                .send({
                    username: testAdminEmail, 
                    password: testAdminPassword, 
                })
                .end(function(err, res) {
                    // TODO: NOT DETECTING COOKIE CORRECTLY
                    expect(res).to.have.cookie('session');
                    done();
                });
        });

        it('responds with status code 401 when username DOES NOT exist', function(done) {
            chai.request(app)
                .post('/login')
                .type('form')
                .send({
                    username: invalidTestAdminEmail, 
                    password: testAdminPassword, 
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('responds with status code 401 when username exists, but password DOES NOT match username', function(done) {
            chai.request(app)
                .post('/login')
                .type('form')
                .send({
                    username: testAdminEmail, 
                    password: invalidTestAdminPassword, 
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});