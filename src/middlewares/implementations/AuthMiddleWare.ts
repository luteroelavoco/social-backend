import jwt from "jsonwebtoken";
import { IAuthMiddleWare } from "../IAuthMiddleWare";
import { autSecret } from "../../config/authConfig";

export class AuthMiddleWare implements IAuthMiddleWare {

  constructor() { }

  isAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: "No token provided" });

    const parts = authHeader.split(" ");

    if (parts.length !== 2) return res.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: "Token malformatted" });

    jwt.verify(token, autSecret, (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token invalid' });

      req.email = decoded.email;
      return next();
    })
  }
}