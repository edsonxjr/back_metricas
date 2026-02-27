import db from '../config/database';

export class UsuarioRepo {
  async buscarPorEmail(email: string) {
    return await db('usuarios').where({ email }).first();
  }

  async create(usuario: any) {
    const [id] = await db('usuarios').insert(usuario);
    return id;
  }
}