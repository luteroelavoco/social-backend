import { autSecret } from "../../config/authConfig";
import { IAuthTokenService } from "../IAuthTokenService";
import jwt from "jsonwebtoken"

export class AuthTokenService implements IAuthTokenService {

  constructor() { }

  generateToken(email: string): string {
    return jwt.sign({ email }, autSecret);
  }

}