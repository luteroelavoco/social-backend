import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { createUserController } from "./useCases/CreateUser";
import { authUserController } from "./useCases/AuthUser";
import { AuthMiddleWare } from "./middlewares/implementations/AuthMiddleWare";
import { updateUserController } from "./useCases/UpdateUser";
import { verifyUserController } from "./useCases/VerifyUser";
import { refreshUserController } from "./useCases/RefreshToken";
import { createBookController } from "./useCases/CreateBook";
import { availableBooksController } from "./useCases/AvailableBooks";
import { createTradeProposalController } from "./useCases/CreateTradeProposal";
import { getUserTradeProposalsController } from "./useCases/GetUserTradeProposals";
import { acceptTradeProposalController } from "./useCases/AcceptTradeProposal";
import { rejectTradeProposalController } from "./useCases/RejectTradeProposal";
import { searchBooksController } from "./useCases/SearchBooks";

const router = Router();
const authMiddleWare = new AuthMiddleWare();

router.post("/auth", (request, response) => {
  return authUserController.handle(request, response);
});

router.post(
  "/users",
  authMiddleWare.isAuth,
  authMiddleWare.isAdmin,
  multer(multerConfig).single("file"),
  (request, response) => {
    return createUserController.handle(request, response);
  }
);

router.post("/users/refresh", authMiddleWare.isAuth, (request, response) => {
  return refreshUserController.handle(request, response);
});

router.put("/users/verify", (request, response) => {
  return verifyUserController.handle(request, response);
});

router.put("/users/:_id", authMiddleWare.isAuth, (request, response) => {
  return updateUserController.handle(request, response);
});

router.post("/books", authMiddleWare.isAuth, (request, response) => {
  return createBookController.handle(request, response);
});

router.get("/books/available", (request, response) => {
  return availableBooksController.handle(request, response);
});

router.post("/trade-proposals", authMiddleWare.isAuth, (request, response) => {
  return createTradeProposalController.handle(request, response);
});

router.get(
  "/trade-proposals/user/:userId",
  authMiddleWare.isAuth,
  (request, response) => {
    return getUserTradeProposalsController.handle(request, response);
  }
);

router.put(
  "/trade-proposals/:proposalId/accept",
  authMiddleWare.isAuth,
  (request, response) => {
    return acceptTradeProposalController.handle(request, response);
  }
);

router.put(
  "/trade-proposals/:proposalId/reject",
  authMiddleWare.isAuth,
  (request, response) => {
    return rejectTradeProposalController.handle(request, response);
  }
);

router.get("/books/search", (request, response) => {
  return searchBooksController.handle(request, response);
});

export { router };
