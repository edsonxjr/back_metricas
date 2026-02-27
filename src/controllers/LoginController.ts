import { POST, route } from "awilix-express";
import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

@route('/login')
export default class LoginController {
  #loginService: LoginService;

  constructor({ loginService }: { loginService: LoginService }) {
    this.#loginService = loginService;
  }

  @POST()
  async autenticar(request: Request, response: Response) {
    try {
      const { email, senha } = request.body;
      const result = await this.#loginService.autenticar(email, senha);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(401).json({ erro: error.message });
    }
  }
}