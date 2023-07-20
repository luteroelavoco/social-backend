export class User {

  public _id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password?: string;
  public role?: string;
  public verified?: boolean;
  public address: {
    state: string,
    city: string,
    street: string,
    number: number,
    complement: string,
    cep: string,
    neighborhood: string,
  }

  constructor(props) {
    Object.assign(this, props);
  }
}