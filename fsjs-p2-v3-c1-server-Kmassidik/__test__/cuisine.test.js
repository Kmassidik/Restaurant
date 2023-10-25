const request = require("supertest");
const app = require("../app");
const { Bcrypt } = require("../helper/bcrypt");
const { sequelize } = require("../models");

beforeAll(async () => {
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
  // kosongin database dahulu agar user tidak error
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
});

describe("GET /pub/cuisine", () => {
  it("should return product data with integrated category, without access_token, and return status 200", async () => {
    const response = await request(app).get("/pub/cuisines");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(9);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("Category", expect.any(Object));
  });
  it("Should return product data after filtered and return status 200", async () => {
    const response = await request(app).get("/pub/cuisines?filter=a");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toBeDefined();
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("Category", expect.any(Object));
  });
  it("Should return product data using pagination and return status 200", async () => {
    const response = await request(app).get("/pub/cuisines?page=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(9);
  });
  it("Should return product data by id and return status 200", async () => {
    const response = await request(app).get("/pub/cuisines/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBeTruthy();
    expect(response.body.responses).toHaveProperty("id", expect.any(Number));
    expect(response.body.responses).toHaveProperty("name", expect.any(String));
    expect(response.body.responses).toHaveProperty("description", expect.any(String));
    expect(response.body.responses).toHaveProperty("price", expect.any(Number));
    expect(response.body.responses).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.responses).toHaveProperty("authorId", expect.any(Number));
    expect(response.body).toHaveProperty("qiris");
  });
  it("Should return data not found and return status 404", async () => {
    const response = await request(app).get("/pub/cuisines/9999");

    expect(response.status).toBe(404);
    expect(response.body).toBe("Data not found");
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
