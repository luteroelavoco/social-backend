import { Router } from "express";
import { createUserControler } from "./useCases/CreateUser";
import { authUserControler } from "./useCases/AuthUser";
import { AuthMiddleWare } from "./middlewares/implementations/AuthMiddleWare";
import { updateUserControler } from "./useCases/UpdateUser";

const router = Router();
const authMiddleWare = new AuthMiddleWare();

router.post('/auth', (request, response) => {
  return authUserControler.handle(request, response);
});

router.post('/users', authMiddleWare.isAuth, authMiddleWare.isAdmin, (request, response) => {
  return createUserControler.handle(request, response);
});

router.put('/users/:_id', authMiddleWare.isAuth, (request, response) => {
  return updateUserControler.handle(request, response);
});

export { router };