import supertest  from"supertest";
import should  from"should";
import config  from'../../src/config/test.config';
import { expect } from 'chai';

// This agent refers to PORT where program is runninng.
let url = config.uri+"webhook/";

var server = supertest.agent(url);

describe("validate webhook active test", () => {

  it("should return fulfillmentText my-text", done =>{
    server
    .post("/")
    .send({
        "queryResult": {
          "queryText": "user's original query to your agent",
          "parameters": {
            "test": "my-text"
          }
        }
    })
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.fulfillmentText.should.equal("my-text");
      done();
    });
  });
});

describe("validate webhook article test", () => {

    it("should return fulfillmentText info article", done =>{
      server
      .post("/")
      .send({
          "queryResult": {
            "queryText": "user's original query to your agent",
            "parameters": {
              "article": "1"
            }
          }
      })
      .expect("Content-type",/json/)
      .expect(200) 
      .end(function(err,res){
        expect(res.body).to.have.property("fulfillmentText");
        done();
      });
    });

    it("should not return fulfillmentText info article", done =>{
        server
        .post("/")
        .send({
            "queryResult": {
              "queryText": "user's original query to your agent",
              "parameters": {
                "article": "0"
              }
            }
        })
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){
          expect(res.body).to.not.have.property("fulfillmentText");
          done();
        });
      });
});

describe("validate webhook order test", () => {

    it("should return 1 new order", done =>{
      server
      .post("/")
      .send({
          "queryResult": {
            "queryText": "user's original query to your agent",
            "parameters": {
              "order": "10 of #1"
            }
          }
      })
      .expect("Content-type",/json/)
      .expect(200) 
      .end(function(err,res){
        expect(res.body).to.have.property("fulfillmentText");
        done();
      });
    });

    it("should return 2 new order", done =>{
        server
        .post("/")
        .send({
            "queryResult": {
              "queryText": "user's original query to your agent",
              "parameters": {
                "order": "10 of #1, 20 of #1"
              }
            }
        })
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){
          expect(res.body).to.have.property("fulfillmentText");
          done();
        });
      });

    
      it("should return error insuficient stock", done =>{
        server
        .post("/")
        .send({
            "queryResult": {
              "queryText": "user's original query to your agent",
              "parameters": {
                "order": "1000 of #1"
              }
            }
        })
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){
          expect(res.body.fulfillmentText).to.match(/Amount is major than stock/);
          done();
        });
    });
});