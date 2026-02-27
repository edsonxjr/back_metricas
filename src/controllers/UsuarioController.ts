import { POST, route } from "awilix-express";
import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

@route('/usuarios')
export class UsuarioController {
  #usuarioService: UsuarioService;

  constructor({ usuarioService }: { usuarioService: UsuarioService }) {
    this.#usuarioService = usuarioService;
  }

  @POST()
  async cadastrar(request: Request, response: Response) {
    try {
      const dadosUsuario = request.body;
      const result = await this.#usuarioService.cadastrar(dadosUsuario);
      
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json({ erro: error.message });
    }
  }
}