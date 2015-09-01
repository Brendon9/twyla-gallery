var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

describe('Piece', function() {

  var piece, id;

  before(function(done) {
    api.post('/api/v1/pieces')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      title: "David",
      description: "David is a masterpiece of Renaissance sculpture created between 1501 and 1504, by Michelangelo",
      price: "150000",
      type: "sculpture",
      dimension: "14ft"
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      id = res.body.id;
      piece = res.body;
      done();
    });
  });

  it('should return a 200 response', function(done) {
    api.get('/api/v1/pieces/' + id)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should be an object with keys and values', function(done) {
    api.get('/api/v1/pieces/' + id)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property("title");
        expect(res.body.title).to.not.equal(null);
        expect(res.body).to.have.property("title");
        expect(res.body.title).to.not.equal(null);
        expect(res.body).to.have.property("description");
        expect(res.body.description).to.not.equal(null);
        expect(res.body).to.have.property("price");
        expect(res.body.price).to.not.equal(null);
        expect(res.body).to.have.property("dimension");
        expect(res.body.dimension).to.not.equal(null);
        expect(res.body).to.have.property("type");
        expect(res.body.type).to.not.equal(null);
        done();
      });
  });

  it('should be updated with a new price', function(done) {
    api.put('/api/v1/pieces/' + id)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        price: '175000'
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.price).to.equal('175000');
        done();
      })
  });

  it('should be deleted', function(done) {
    api.delete('/api/v1/pieces/' + id)
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect(200, done);
  });


});
