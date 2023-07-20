
export interface IAuthTokenService {
  generateToken(email: string): string;
}