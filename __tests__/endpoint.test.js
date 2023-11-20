const app = require("../app");
const request = require("supertest");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

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
// describe("/api", () => {
//   test("/api responds by creating a JSON file with all of the possible endpoints from /api", () => {
//     return request(app)
//       .get("/api")
//       .expect(200)
//       .then(({ body }) => {
//         body.forEach((bodies) => {
//           expect(bodies.path).toMatchObject({
//             "GET /api": {
//               description:
//                 "serves up a json representation of all the available endpoints of the api",
//             },
//             "GET /api/topics": {
//               description: "serves an array of all topics",
//               queries: [],
//               exampleResponse: {
//                 topics: [{ slug: "football", description: "Footie!" }],
//               },
//             },
//           });
//         });
//       });
//   });
// });
