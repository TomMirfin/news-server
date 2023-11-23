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
  test("404: responds with AN error when there are no articles related to ID", () => {
    return request(app)
      .get("/api/articles/notANumber")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("/api/articles", () => {
  test(`when all articles is requested, reponds with all articles in ascending order by creating date and no body`, () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        expect(body).toBeSortedBy(body.created_at, { descending: true });
      });
  });
  test(`Each reply must respond with an object which includes author, title, article_id, topic, created_at, votes, article_img_url and comment count `, () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        body.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
  test("status:404, responds with an error message when passed a bad path", () => {
    return request(app)
      .get("/api/wrong-pathway")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test(" Posts a new comment into an article with a given ID", () => {
    const newComment = {
      username: "rogersop",
      body: "Hello this is my new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          body: "Hello this is my new comment",
          author: "rogersop",
        });
      });
  });
  test("404: If a new comment is posted with a username that doesn't exist an error will be returned", () => {
    const newComment = {
      username: "TomdaBomb",
      body: "Hello this is my new comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No username found");
      });
  });
});
describe("PATCH: /api/articles/:article_id", () => {
  test("the endpoint will successfully increment the article on a given ID by updating the votes on that article ", () => {
    const newVote = {
      incVotes: 10,
    };

    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 110,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("the endpoint will successfully decrement the article on a given ID by updating the votes on that article ", () => {
    const newVote = {
      incVotes: -100,
    };

    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("status:404, responds with an error message when passed a bad path", () => {
    return request(app)
      .get("/api/wrong-pathway")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: responds with an error when there are no articles related to ID a valid id which inludes no articles", () => {
    return request(app)
      .get("/api/articles/654445666")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("404: responds with an error when the article Id is not of a valid structure", () => {
    return request(app)
      .get("/api/articles/notANumber")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
