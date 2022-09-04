const chai = require("chai");
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require("./app");
const request = require("supertest");

chai.use(chaiHttp);
chai.use(require('chai-like'));
chai.use(require('chai-things'));

// UNIT test begin
describe("API Tests:", () => {
  describe("Homepage is accessed", () => {
    it("Should return HTTP Response 200", (done) => {
      request(app)
        .get("/")
        .end((err, res) => {
          const body = res.body;
          expect(res.status).equal(200);
          done();
        });
    })
  
  });

  describe("User Data", () => {
    it("should list ALL users on /api GET", (done) => {
      request(app)
        .get("/api")
        .end((err, res) => {
        const body = res.body;
        expect(res.status).equal(200);
        expect(body).to.be.an("array").that.contains.something.like({name: "Dave"});
        done();
        });
    })
  
  });


  describe("Add User Data", () => {
    it("Add user to list /api POST", (done) => {
      let myData = {
        id: 27,
        email: "examplne@example.com",
        name: "admin",
        age: 12
      };
      request(app)
        .post("/api")
        .send(myData)
        .end((err, res) => {
        const body = res.body;
        expect(res.status).equal(200);
        expect(body).to.be.an("array").that.contains.something.like({id: 27});
        expect(body).to.be.an("array").that.contains.something.like({name: "admin"});
       done();
        });
    })
  
  });


})
