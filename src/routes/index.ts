import { Router } from "express";
import { createUserRoute } from "./createUser";

const router = Router();

router.use(createUserRoute);

export { router };
