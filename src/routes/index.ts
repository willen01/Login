import { Router } from "express";
import { createUserRoute } from "./createUser";
import { loginUserRouter } from "./loginUser";

const router = Router();

router.use(createUserRoute);
router.use(loginUserRouter);

export { router };
