import { Router } from "express";
import { forgotPasswordController } from "../modules/RecoverPassword/forgotPassword";

const forgotPaswordRouter = Router();

forgotPaswordRouter.post(
  "/api/user/forgotpassword",
  async (request, response) => {
    await forgotPasswordController.handle(request, response);
  }
);

export { forgotPaswordRouter };
