const express = require("express");
const { Controller } = require("../controllers/controller");
const { authentication } = require("../midddleware/authentication");
const { Authorization } = require("../midddleware/authorization");
let routes = express.Router();

routes.use(authentication);

routes.get("/users", Controller.users);
routes.get("/users/:id", Controller.userById);
routes.delete("/users/:id", Authorization.user, Controller.deleteUser);

routes.get("/cuisines", Controller.cuisines);
routes.get("/cuisines/:id", Controller.cuisineById);
routes.put("/cuisines/:id", Authorization.cuisine, Controller.putCuisines);
routes.patch(
  "/cuisines/:id",
  Authorization.onlyAdmin,
  Controller.patchCuisines
);
routes.post("/cuisines", Controller.addCuisines);
routes.delete("/cuisines/:id", Authorization.cuisine, Controller.deleteCuisine);

routes.get("/categories", Controller.categories);
routes.get("/categories/:id", Controller.categoryById);
routes.post("/categories", Authorization.onlyAdmin, Controller.addCategories);
routes.delete(
  "/categories/:id",
  Authorization.onlyAdmin,
  Controller.deleteCategory
);

routes.get("/cuisine-category/:id", Controller.cuisineByCategory);
routes.get("/histories", Controller.getHistories);

module.exports = routes;
