const { Videogame, Genre, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({
          name: "Super Mario Bros",
          background_image:
            "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg",
          platforms: [
            "Xbox One",
            "PlayStation 4",
            "Nintendo Switch",
            "PC",
            "macOS",
          ],
          description: "The year is 2021, ",
          released: "2015-10-23",
          rating: 0,
          genres: ["Adventure", "Puzzle"],
        });
      });
      it("should generate random id", () => {
        Videogame.create({
          name: "Super Mario Bros",
          background_image:
            "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg",
          platforms: [
            "Xbox One",
            "PlayStation 4",
            "Nintendo Switch",
            "PC",
            "macOS",
          ],
          description: "The year is 2021, ",
          released: "2015-10-23",
          rating: 0,
          genres: ["Adventure", "Puzzle"],
        });
      });
    });
  });
});

describe("Genre model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({
          name: "SuperMegaAction",
        });
      });
    });
  });
});
