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