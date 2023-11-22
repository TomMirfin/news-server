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
  test("status:400, responds with an error message when passed a bad path", () => {
    return request(app)
      .get("/api/nvnewbs")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("/api/articles/", () => {
  test("200: responds with articles related to ID", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject([
          {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          },
        ]);
      });
  });
  test("404: responds with AN error when there are no articles related to ID", () => {
    return request(app)
      .get("/api/articles/654445666")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("500: responds with AN error when there are no articles related to ID", () => {
    return request(app)
      .get("/api/articles/notANumber")
      .expect(500)
      .then(({ body }) => {
        expect(body.msg).toBe("Internal Server Error");
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("The endpoint will respond with an array of comments from the given article ID", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        body.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });

  test("The endpoint will respond with array", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  test("404 given a bad article ID the endpoint will respond with an error", () => {
    return request(app)
      .get("/api/articles/555667/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("no comments found");
      });
  });
  test("500 given an article ID which is not a number the endpoint will respond with an error", () => {
    return request(app)
      .get("/api/articles/not-a-numerical-value/comments")
      .expect(500)
      .then(({ body }) => {
        expect(body.msg).toBe("Internal Server Error");
      });
  });
  test("404 given a valid article ID which does not contain an error, return a no comments found error", () => {
    return request(app)
      .get("/api/articles/10/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("no comments found");
      });
  });
});
