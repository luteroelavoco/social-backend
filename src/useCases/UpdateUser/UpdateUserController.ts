import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, address, password } = request.body;
    const { _id } = request.params;

    try {
      const user = await this.updateUserUseCase.execute({
        _id,
        firstName,
        lastName,
        address,
        password,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected Error",
      });
    }
  }
}
