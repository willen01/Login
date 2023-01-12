import { Router } from "express";
import { resetPasswordController } from "../modules/RecoverPassword/resetPassword";

const resetPasswordRouter = Router();

resetPasswordRouter.post(
  "/api/user/resetpassword",
  async (request, response) => {
    await resetPasswordController.handle(request, response);
  }
);

export { resetPasswordRouter };
