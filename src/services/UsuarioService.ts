import bcrypt from 'bcrypt';
import { UsuarioRepo } from "../repositories/UsuarioRepo";

export class UsuarioService {
  #usuarioRepo: UsuarioRepo;

  constructor({ usuarioRepo }: { usuarioRepo: UsuarioRepo }) {
    this.#usuarioRepo = usuarioRepo;
  }

  async cadastrar(dadosUsuario: any) {
    const usuarioExiste = await this.#usuarioRepo.buscarPorEmail(dadosUsuario.email);

    if (usuarioExiste) {
      throw new Error('Já existe um usuário com este e-mail.');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(dadosUsuario.senha, salt);

    const novoUsuario = {
      ...dadosUsuario,
      senha: senhaCriptografada
    };

    const id = await this.#usuarioRepo.create(novoUsuario);
    
    return { 
      id, 
      mensagem: 'Usuário cadastrado com sucesso!' 
    };
  }
}