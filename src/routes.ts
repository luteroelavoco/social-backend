import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { createUserControler } from "./useCases/CreateUser";
import { authUserControler } from "./useCases/AuthUser";
import { AuthMiddleWare } from "./middlewares/implementations/AuthMiddleWare";
import { updateUserControler } from "./useCases/UpdateUser";
import { verifyUserControler } from "./useCases/VerifyUser";
import { refreshUserControler } from "./useCases/RefreshToken";

const router = Router();
const authMiddleWare = new AuthMiddleWare();

router.post('/auth', (request, response) => {
  return authUserControler.handle(request, response);
});

router.post('/users', authMiddleWare.isAuth, authMiddleWare.isAdmin, multer(multerConfig).single("file"), (request, response) => {
  return createUserControler.handle(request, response);
});

router.post('/users/refresh', authMiddleWare.isAuth, (request, response) => {
  return refreshUserControler.handle(request, response);
});

router.put('/users/verify', (request, response) => {
  return verifyUserControler.handle(request, response);
});

router.put('/users/:_id', authMiddleWare.isAuth, (request, response) => {
  return updateUserControler.handle(request, response);
});


export { router };