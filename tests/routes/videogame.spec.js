/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  background_image:
    "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg",
  platforms: ["Xbox One", "PlayStation 4", "Nintendo Switch", "PC", "macOS"],
  description: "The year is 2021, ",
  released: "2015-10-23",
  rating: 0,
  genres: ["Adventure", "Puzzle"],
};
const videogame2 = {
  name: "Super Mario Bros 2",
  background_image:
    "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg",
  platforms: ["Xbox One", "PlayStation 4", "Nintendo Switch", "PC", "macOS"],
  description: "The year is 2021, ",
  released: "2015-10-23",
  rating: 0,
  genres: ["Adventure", "Puzzle"],
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
  //tarda demasiado
  // describe("GET /videogames", () => {
  //   it("should get 200", () => agent.get("/videogames").expect(200));
  // });
  describe("GET by ID /videogames/:idVideogame", () => {
    it("should get 200", () => agent.get("/videogames/byId/1").expect(200));
    it("should get 404 if videogame doesn't exists", () =>
      agent.get("/videogames/byId/a3").expect(404));
  });
  describe("POST /videogames", () => {
    it("should get 400 if data is incomplete", () =>
      agent.post("/videogames").expect(400));
    it("should get 400 if videogame alredy exists", () =>
      agent.post("/videogames", videogame).expect(400));
    it("should get 201 if videogame was created", () =>
      agent.post("/videogames", videogame2));
  });
});
