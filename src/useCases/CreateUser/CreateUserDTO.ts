export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string
  address?: {
    state: String,
    city: String,
    street: String,
    number?: Number,
    complement?: String,
    cep: String,
    neighborhood: String,
  }
}