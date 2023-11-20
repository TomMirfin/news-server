const app = require("../app");
const request = require("supertest");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const { values } = require("../db/data/test-data/articles");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("/api/topics", () => {
  test("Then endpoint will respond with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toMatchObject({
          description: "The man, the Mitch, the legend",
          slug: "mitch",
        });
      });
  });
  test("status:404, responds with an error message when passed a bad path", () => {
    return request(app)
      .get("/api/nvnewbs")
      .expect(404)
      .then(({ body }) => {
        console.log(body, "<-- resp");
        expect(body.msg).toBe("Not Found");
      });
  });
});
