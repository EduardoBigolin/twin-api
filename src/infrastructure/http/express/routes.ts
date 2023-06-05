import { Router } from "express";
import { signUpController } from "./controller/user/sign-up";
import { signInController } from "./controller/user/sign-in";
import { VerifyAccountController } from "./controller/user/account";
import { CreateShopController } from "./controller/shop/create-shop";
import { AuthMiddleware } from "./middleware/auth";
import { AddProductController } from "./controller/product/add-product";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to the twin API!",
  });
});

// USERS
routes.post("/user", signUpController.execute);
routes.post("/user/login", signInController.execute);
routes.get("/user/verify/:id", VerifyAccountController.execute);

// SHOP
routes.post("/shop", AuthMiddleware.authenticate, CreateShopController.execute);
routes.post(
  "/shop/:shopId/product",
  AuthMiddleware.authenticate,
  AddProductController.execute
);

export { routes };
