export interface IUpdateUserRequestDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    state: string,
    city: string,
    street: string,
    number: number,
    complement: string,
    cep: string,
    neighborhood: string,
  }
}