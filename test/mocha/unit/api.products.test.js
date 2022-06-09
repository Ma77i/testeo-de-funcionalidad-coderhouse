const supertest = require("supertest");
const expect = require("chai").expect;
const createProduct = require("../../util");

const API_URL = "http://localhost:8080/api/products";

describe("API Products", () => {
  const agent = supertest(API_URL);

  it("should retrieve all products", async (done) => {
    const res = await agent.get("/api/products");
    console.log(res)
    expect(res.status).to.equal(200);
    done();
  }).timeout(10000);

  it("should create a new product", async (done) => {
    const product = createProduct();
    const res = await agent.post("/api/products").send({ product });
    expect(res.status).to.equal(201);
    done();
  }).timeout(10000);
});
