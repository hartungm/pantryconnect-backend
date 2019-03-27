var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest');
var app = require('../server');

var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe("Guide to documentation when root is accessed", () => {
    it("Should return a link to documenation when '/' is accessed", (done) => {
        request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            res.text.should.be.equal('Hello, please check out the documentation for more information on this API');
            done();
        });
    });
});

describe("Get recipes from the database", () => {
    it("Should return a test recipe", (done) => {
        request(app)
        .get('/search?filter=1')
        .send({"ingredients": ["htest", "btest", "dtest", "ctest", "ltest", "ytest", "testets"]})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            var testRecipe = require('../sample-data/sample-recipe');
            expect(res.body.name).to.be.equal(testRecipe.name);
            done();
        });
    });

    it("Should error out when ingredients aren't passed to the method", (done) => {
        request(app)
        .get('/search')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            expect(err).to.not.be.undefined
            done();
        });
    });
});