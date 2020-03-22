var supertest = require("supertest");
var should = require("should");
var config = require('../../src/config/test.config');

// This agent refers to PORT where program is runninng.
let url = config.uri+"articles/";

var server = supertest.agent(url);

describe("get results articles unit test",function(){

  it("should return all articles",function(done){
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });

  it("should return one article",function(done){
    server
    .get("/1")
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });

});
