var supertest = require("supertest");
var should = require("should");
var config = require('../../src/config/test.config');

// This agent refers to PORT where program is runninng.
let url = config.uri;

var server = supertest.agent(url);

describe("Index unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

});