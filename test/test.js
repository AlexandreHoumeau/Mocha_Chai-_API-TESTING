var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;

describe('Test GET POST PUT DEL of API-TESTING-TEST', function() {
  it('Response should be 200 if URL is correct', function() {   
    chai.request('http://localhost:3000/todoitems')
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200); 
    });
  });
  
  it('Response should be 404 if URL is incorrect', function() {   
    chai.request('http://localhost:3000/todoitemss')
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(404); 
    });
  });
  
  it('Response should be 200 if post data to good URL', function() {   
    chai.request('http://localhost:3000/todoitems')
    .post('/')
    .send({
      'name': 'ma tâche',
      'status': 'done'
    })
    .end(function(err, res) {
      expect(res).to.have.status(200); 
    });
  });
  
  it('Response should be 200 if update data', function() {   
    chai.request('http://localhost:3000/todoitems/')
    .put('5e1c8da6765871cc38b983ad')
    .send({ 
      "name": "tâche update", 
      "status" : "in progress"
     })
     .end(function(err, res) {
      expect(res).to.have.status(200); 
    });
  });
  
  it('Response should be 200 if delete data', function() {   
    chai.request('http://localhost:3000/todoitems/')
    .del('5e1d7ec24964aad94a1b66aa')
    .send({ 
      "name": "tâche update", 
      "status" : "in progress"
     })
     .end(function(err, res) {
      expect(res).to.have.status(200); 
    });
  });
  
  it('Response should be JSON', function() {   
    chai.request('http://localhost:3000/todoitems/')
    .get('/')
     .end(function(err, res) {
      expect(res).to.be.json;; 
    });
  });
});