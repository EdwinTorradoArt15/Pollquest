import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { User } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.userModel.create({
      ...createUsuarioDto,
      clave: bcrypt.hashSync(createUsuarioDto.clave, 10),
    });
  }

  findAll() {
    return this.userModel.find().select('-clave');
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async validateUser(loginUserDTO: LoginUserDto) {
    const { email, clave } = loginUserDTO;
    const user = await this.userModel.findOne({ email }).select('email clave');
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const isMatch = bcrypt.compareSync(clave, user.clave);
    if (!isMatch) {
      throw new UnauthorizedException('Clave incorrecta');
    }
    return user;
  }
  async login(user: User) {
    const token = await this.createPayload(user);
    return { access_token: token };
  }

  createPayload(user: User) {
    const payload = { correo: user.email, _id: user._id };

    return this.jwtService.sign(payload);
  }
}
