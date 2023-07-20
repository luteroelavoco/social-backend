import { NextFunction, Request, Response } from "express";

export interface IAuthMiddleWare {
  isAuth(req: Request, res: Response, next: NextFunction): any;
  isAdmin(req: Request, res: Response, next: NextFunction): any;
}