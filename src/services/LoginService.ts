import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UsuarioRepo } from "../repositories/UsuarioRepo"; 

export class LoginService {
  #usuarioRepo: UsuarioRepo;


  constructor({ usuarioRepo }: { usuarioRepo: UsuarioRepo }) {
    this.#usuarioRepo = usuarioRepo;
  }

  async autenticar(email: string, senhaPlana: string) {
   
    const usuario = await this.#usuarioRepo.buscarPorEmail(email)

    if (!usuario) {
      throw new Error("Credenciais inválidas.");
    }

    const senhaValida = await compare(senhaPlana, usuario.senha);

    if (!senhaValida) {
      throw new Error("Credenciais inválidas.");
    }

    const token = sign(
      { idUsuario: usuario.id, email: usuario.email },
      "sua_chave_secreta_aqui"
    );

    return { token };
  }
}