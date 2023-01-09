import { Router } from "express";
import { loginUserController } from "../modules/login/useCases/LoginUser";

const loginUserRouter = Router();

loginUserRouter.post("/api/user/login", async (request, response) => {
  await loginUserController.handle(request, response);
});

export { loginUserRouter };
