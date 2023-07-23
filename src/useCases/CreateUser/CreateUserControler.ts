import { Request, Response } from "express";
import { CreaterUserUseCase } from "./CreateUserUseCase";

export class CreateUserControler {
  constructor(private createUserUseCase: CreaterUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      firstName,
      lastName,
      email,
      password,
      state,
      city,
      street,
      number,
      complement,
      cep,
      role,
      neighborhood,
    } = request.body;
    const avatar = request?.file?.["location"];
    const address = {
      state,
      city,
      street,
      number,
      complement,
      cep,
      neighborhood,
    };
    try {
      const user = await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        address,
        avatar,
        role,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
