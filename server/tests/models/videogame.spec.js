const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(async () => await Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if object is empty", (done) => {
        Videogame.create({})
          .then(() => done(new Error("Object is empty")))
          .catch(() => done());
      });
      it("should at least have a name", (done) => {
        Videogame.create({ description: "mate" })
          .then(() => done("Name required"))
          .catch(() => done());
      });
      it("should at least have a description", (done) => {
        Videogame.create({ name: "hello" })
          .then(() => done("Description required"))
          .catch(() => done());
      });
    });
  });
});
