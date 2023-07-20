import { Router } from "express";
import { createUserControler } from "./useCases/CreateUser";
import { authUserControler } from "./useCases/AuthUser";
import { AuthMiddleWare } from "./middlewares/implementations/AuthMiddleWare";

const router = Router();
const authMiddleWare = new AuthMiddleWare();

router.post('/auth', (request, response) => {
  return authUserControler.handle(request, response);
});

router.post('/users', authMiddleWare.isAuth, (request, response) => {
  return createUserControler.handle(request, response);
});

export { router };