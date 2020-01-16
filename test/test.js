const mongoose = require('mongoose');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const server = require('../index');
const todoItems = require('../api/model/TodoItem');
const TodoItem = mongoose.model('TodoItem', todoItems);

describe('Test suite for API testing', function() {
  beforeEach((done) => {
    TodoItem.remove({}, () => {
      done();
    });
  });
// ->> 1
  it('Response should be 200 if URL is correct with a GET request', function(done) {
    chai.request(server)
    .get('/todoitems')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      res.should.be.json;
      done();
    });
  });
// -->> 2
  it('Response should be 404 if URL is incorrect with a bad GET request', function(done) {
    chai.request(server)
    .get('/todoitemss')
    .end(function(err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
// -->> 3
  it('Response should be 200 with a POST request', function(done) {
    const param = {
      name: 'Ma tache',
      status: 'done'
    };
    chai.request('http://localhost:3000/todoitems')
    .post('/')
    .send(param)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      res.should.be.json;
      res.body.name.should.eql(param.name);
      res.body.status.should.eql(param.status);
      done();
    });
  });
  // -->> 3.1
    it('Response should be 500 with a bad POST request', function(done) {
      const param = {
        name: 'Ma tache updated',
        status: 'don'
      };
      chai.request(server)
      .post('/todoitems')
      .send(param)
      .end(function(err, res) {
        expect(res).to.have.status(500);
        res.body.should.be.a('object');
        res.should.be.json;
        done();
      });
    });
// -->> 4
  it('Response should be 200 with an UPDATE request', function(done) {
    const item = new TodoItem({
      name: 'Ma tache',
      status: 'inProgress'
    });
    const param = {
      name: 'Ma tache updated',
      status: 'done'
    };
    item.save(() => {
      chai.request(server)
        .put('/todoitems/' + item._id)
        .send(param)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          res.should.be.json;
          TodoItem.find({}, (err, items) => {
            items[0].name.should.eql(param.name);
            items[0].status.should.eql(param.status);
            done();
          });
        });
      });
    });
// -->> 5
  it('Response should be 200 with a DELETE request', function(done) {
    const aTodoItem = new TodoItem({
      name: 'firstTask',
      status: 'inProgress'
    });
    aTodoItem.save((err, savedTodoItem) => {
      chai.request(server)
      .delete('/todoitems/' + savedTodoItem._id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        TodoItem.find({}, (err, res) => {
          res.length.should.eql(0);
        });
        done();
      });
    });
  });
// -->> 6
  it('Response should be a JSON with a POST request', function(done) {
    const param = {
      name: 'Ma tache',
      status: 'done'
    };
    chai.request(server)
    .post('/todoitems')
    .send(param)
     .end(function(err, res) {
      expect(res).to.be.json;
      expect(res.body.name).to.equal('Ma tache');
      expect(res.body.status).to.equal('done');
      done();
    });
  });
});