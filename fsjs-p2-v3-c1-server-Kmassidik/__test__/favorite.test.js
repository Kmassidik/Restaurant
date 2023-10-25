const request = require("supertest");
const app = require("../app");
const { Bcrypt } = require("../helper/bcrypt");
const { sequelize } = require("../models");

let access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjk1MTU0OTUxfQ.UY-3oSdIyaMfPzt7uSmNfmumJsLAus7c-ge8byBcPQs";

beforeAll(async () => {
  let dataCustomer = require("../json/user.json");
  dataCustomer = dataCustomer.map((e) => ({
    ...e,
    password: Bcrypt.hashPassword(e.password, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await sequelize.queryInterface.bulkInsert("Users", dataCustomer);

  let dataCategory = require("../json/category.json");
  dataCategory = dataCategory.map((e) => ({
    ...e,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);

  let dataCuisine = require("../json/cusine.json");
  dataCuisine = dataCuisine.map((e) => ({
    ...e,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await sequelize.queryInterface.bulkInsert("Cuisines", dataCuisine);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Favorites", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("POST /pub/favorites", () => {
  // success post wishlist
  it("return 201 success add product to wishlist", async () => {
    const response = await request(app)
      .post("/pub/favorites")
      .send({
        id: 1,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("UserId");
    expect(response.body).toHaveProperty("CuisineId");
  });

  // error post wishlist no product id
  it("return 404 error add product to wishlist", async () => {
    const response = await request(app)
      .post("/pub/favorites")
      .send({
        ProductId: "100",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toBe("Data Cuisine is Invalid!");
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});

describe("GET /pub/favorites", () => {
  it("return 200 success get wishlists", async () => {
    const response = await request(app)
      .get("/pub/favorites")
      .set("access_token", access_token)
      .expect(200);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("UserId");
    expect(response.body[0]).toHaveProperty("CuisineId");
    expect(response.body[0]).toHaveProperty("Cuisine");
    expect(response.body[0].Cuisine).toHaveProperty("name");
    expect(response.body.length).toBeGreaterThan(0);
  });

  // error get wishlist cause not login and not have access_token
  it("return 401 cannot get wishlist unauthorized", async () => {
    const response = await request(app)
    .get("/pub/favorites")

    expect(response.status).toBe(401);
    expect(response.body).toBe("Authentication failed");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

   // error get wishlist cause not login and access_token is random string
   it("return 401 cannot get wishlist unauthorized because access_token is random", async () => {
    const response = await request(app)
    .get("/pub/favorites")
    .set("access_token", "asdasd.asdasda.1231312321.sdfasdfasdfasdf.12341234")

    expect(response.status).toBe(401);
    expect(response.body).toBe("Authentication failed");
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});

