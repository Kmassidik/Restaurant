const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("POST /pub/register", () => {
  it("should return a registered User and return status 201", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@testuser.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(`${userData.email} success add!`);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty("id", expect.any(Number));
    expect(response.body.data).toHaveProperty("username", userData.username);
    expect(response.body.data).toHaveProperty("email", userData.email);
    expect(response.body.data).toHaveProperty("role", "customer");
  });

  it("should return an error because email is null and return status 400", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Email is required!");
  });

  it("should return an error because password is null and return status 400", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@testuser.com",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Password is required!");
  });

  it("should return an error because email is empty and return status 400", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
      email: "",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Email is required!");
  });

  it("should return an error because password is empty and return status 400", async () => {
    const userData = {
      username: "testuser",
      password: "",
      email: "testuser@testuser.com",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Password is required!");
  });

  it("should return an error because email has been used and return status 400", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@testuser.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe(
      "Email has been registered, please use another email!"
    );
  });

  it("should return an error because email has an invalid format and return status 400", async () => {
    const userData = {
      username: "testuser",
      password: "testpassword",
      email: "asdasdasd.com",
    };

    const response = await request(app)
      .post("/pub/register")
      .send(userData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe(
      "Your email input format is wrong, example: example@example.com"
    );
  });
});

describe("POST /pub/login", () => {
  it("should return an success return status 200", async () => {
    const userData = {
      email: "testuser@testuser.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/pub/login")
      .send(userData)
      .expect(200);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("name");
  });
  it("should return an error because password is wrong return status 401", async () => {
    const userData = {
      email: "testuser@testuser.com",
      password: "testpasswordddd",
    };

    const response = await request(app)
      .post("/pub/login")
      .send(userData)
      .expect(401);

    expect(response.status).toBe(401);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Invalid Password!");
  });
  it("should return an error because email is wrong return status 401", async () => {
    const userData = {
      email: "ttestuser@testuser.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/pub/login")
      .send(userData)
      .expect(401);

    expect(response.status).toBe(401);
    expect(typeof response.body).toBe("string");
    expect(response.body).toBe("Invalid Email!");
  });
});
