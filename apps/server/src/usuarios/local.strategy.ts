import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

import { UsuariosService } from './usuarios.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      usernameField: 'email',
      passwordField: 'clave',
    });
  }

  async validate(email: string, clave: string): Promise<any> {
    const loginDTO: LoginUserDto = { email: email, clave: clave };
    const user = await this.usuariosService.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
