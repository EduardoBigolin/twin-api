import { Router } from "express";
import {
  AddProductController,
  ApplyDiscountController,
  RemoveDiscountController,
} from "./controller/product";
import { CreateShopController } from "./controller/shop";
import {
  SignInController,
  SignUpController,
  VerifyAccountController,
} from "./controller/user";
import { AuthMiddleware } from "./middleware/auth";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to the twin API!",
  });
});

// USERS
routes.post("/user", SignUpController.execute);
routes.post("/user/login", SignInController.execute);
routes.get("/user/verify/:id", VerifyAccountController.execute);

// SHOP
routes.post("/shop", AuthMiddleware.authenticate, CreateShopController.execute);
routes.post(
  "/shop/:shopId/product",
  AuthMiddleware.authenticate,
  AddProductController.execute
);

// PRODUCTS
routes.post(
  "/product/apply-discount",
  AuthMiddleware.authenticate,
  ApplyDiscountController.execute
);
routes.post(
  "/product/apply-discount",
  AuthMiddleware.authenticate,
  RemoveDiscountController.execute
);

export { routes };
