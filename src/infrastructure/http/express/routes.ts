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
import { AddCommentController } from "./controller/comment/add-comment";
import { CreateCartController } from "./controller/cart/create-cart";
import { AddProductCartController } from "./controller/cart/add-product-cart";

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

// ADD COMMENT
routes.post(
  "/comment/:productId",
  AuthMiddleware.authenticate,
  AddCommentController.execute
);

// CART
routes.post(
  "/cart",
  AuthMiddleware.authenticate,
  CreateCartController.execute
);
routes.post(
  "/cart/product",
  AuthMiddleware.authenticate,
  AddProductCartController.execute
);

export { routes };
