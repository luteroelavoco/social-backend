export class User {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: string;
  public address: {
    state: String,
    city: String,
    street: String,
    number: Number,
    complement: String,
    cep: String,
    neighborhood: String,
  }

  constructor(props) {
    Object.assign(this, props);
  }
}