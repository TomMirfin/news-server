const app = require("../app");
const request = require("supertest");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const endpointJSON = require("../endpoints.json");
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
        expect(body).toMatchObject([
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ]);
      });
  });
  test("status:404, responds with an error message when passed a bad path", () => {
    return request(app)
      .get("/api/nvnewbs")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
describe("/api", () => {
  test("/api responds by creating a file matching that of the example.json file", () => {
    return request(app)
      .get(`/api`)
      .expect(200)
      .then(({ body }) => {
        expect(body.API).toMatchObject(endpointJSON);
      });
  });
  test("/api responds by creating a file matching that of the example.json file and ensuring property types are correct", () => {
    return request(app)
      .get(`/api`)
      .expect(200)
      .then(({ body }) => {
        for (let keys in body.API) {
          if (!body.API[keys].queries && !body.API[keys].exampleResonse) {
            expect(typeof body.API[keys].description).toBe("string");
          } else {
            expect(typeof body.API[keys].description).toBe("string");
            expect(typeof body.API[keys].queries).toBe("object");
            expect(typeof body.API[keys].exampleResponse).toBe("object");
          }
        }
      });
  });
});
