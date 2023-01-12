import { Router } from "express";
import { createUserRoute } from "./createUser";
import { forgotPaswordRouter } from "./forgotPassword";
import { loginUserRouter } from "./loginUser";
import { resetPasswordRouter } from "./resetPassword";

const router = Router();

router.use(createUserRoute);
router.use(loginUserRouter);
router.use(forgotPaswordRouter);
router.use(resetPasswordRouter);

export { router };
