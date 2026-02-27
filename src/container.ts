import { createContainer, asClass, InjectionMode } from 'awilix';
import { UsuarioRepo } from './repositories/UsuarioRepo';
import { LoginService } from './services/LoginService';
import { UsuarioService } from './services/UsuarioService';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
  usuarioRepo: asClass(UsuarioRepo).singleton(),
  loginService: asClass(LoginService).singleton(),
  usuarioService: asClass(UsuarioService).singleton()
});

export default container;