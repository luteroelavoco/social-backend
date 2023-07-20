import { Request, Response } from "express";
import { CreaterUserUseCase } from "./CreateUserUseCase";

export class CreateUserControler {
  constructor(
    private createUserUseCase: CreaterUserUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, password, address } = request.body;

    try {
      const user = await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        address
      })

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error"
      })
    }
  }
}