/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "hello mate",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
    it("should return an array with 101 games", () =>
      agent.get("/videogames").then((res) => {
        expect(res.body.length).to.equal(101);
      }));
    it("should return 4 games if we look up the word grand", () =>
      agent.get(`/videogames?name=${"grand"}`).then((res) => {
        expect(res.body.length).to.equal(4);
      }));
  });
});
