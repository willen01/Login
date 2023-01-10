import { Router } from "express";
import { createUserController } from "../modules/register/useCases/createUser";

const createUserRoute = Router();

createUserRoute.post("/api/user/register", async (request, response) => {
  await createUserController.handle(request, response);
});

export { createUserRoute };
