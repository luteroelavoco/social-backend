
export interface IAuthTokenService {
  generateToken(email: string): string;
  verifyToken(token: string): string;
}