import { Router } from "express";
import { signUpController } from "./controller/user/sign-up";
import { signInController } from "./controller/user/sign-in";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to the twin API!",
  });
});

// USERS
routes.post("/user", signUpController.execute);
routes.post("/user/login", signInController.execute);

export { routes };
