import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { User } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsuariosService {
  private reclaimTimer: NodeJS.Timeout;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
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

  findOne(id: string) {
    const user = this.userModel.findById(id).select('-clave');
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }

  async updateInfoUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { clave, email, ...rest } = updateUsuarioDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      throw new UnauthorizedException('El correo ya está en uso');
    }

    if (clave) {
      const claveHash = bcrypt.hashSync(clave, 10);
      return this.userModel.findByIdAndUpdate(
        id,
        {
          $set: { ...rest, clave: claveHash },
        },
        { new: true },
      );
    } else {
      return this.userModel.findByIdAndUpdate(
        id,
        {
          $set: { ...rest },
        },
        { new: true },
      );
    }
  }

  updatePerfil(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { imagenPerfilUrl } = updateUsuarioDto;
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { imagenPerfilUrl },
      },
      { new: true },
    );
  }

  updatePortada(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { imagenPortadaUrl } = updateUsuarioDto;
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { imagenPortadaUrl },
      },
      { new: true },
    );
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

  async followUser(id: string, idSeguir: string) {
    const usuario = await this.userModel.findById(id);
    const usuarioSeguir = await this.userModel.findById(idSeguir);

    if (!usuario || !usuarioSeguir) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (usuario.seguidores.includes(idSeguir)) {
      throw new UnauthorizedException('Ya sigues a este usuario');
    }

    usuario.seguidores.push(idSeguir);
    usuarioSeguir.siguiendo.push(id);

    await usuario.save();
    await usuarioSeguir.save();

    return usuario;
  }

  async unfollowUser(id: string, idSeguir: string) {
    const usuario = await this.userModel.findById(id);
    const usuarioSeguir = await this.userModel.findById(idSeguir);

    if (!usuario || !usuarioSeguir) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!usuario.seguidores.includes(idSeguir)) {
      throw new UnauthorizedException('No sigues a este usuario');
    }

    usuario.seguidores = usuario.seguidores.filter(
      (userId) => userId.toString() !== idSeguir,
    );
    usuarioSeguir.siguiendo = usuarioSeguir.siguiendo.filter(
      (userId) => userId.toString() !== id,
    );

    await usuario.save();
    await usuarioSeguir.save();

    return usuario;
  }

  async forgotPasswordStep1(email: string) {
    if (!email) {
      return { error: 'Debe proporcionar un email' };
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const codigo = this.generateVerificationCode();

    if (email) {
      await this.sendCodeByEmail(email, codigo);
    }

    // Guardar el codigo en la BD
    user.codigoVerificacion = codigo;
    await user.save();

    this.reclaimTimer = setTimeout(async () => {
      user.codigoVerificacion = null;
      await user.save();
    }, 1 * 60 * 1000);
  }

  async forgotPasswordStep2(email: string, codigo: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return {
        message: 'No se encontró ningún usuario con el email',
      };
    }

    if (user.codigoVerificacion !== codigo) {
      return { message: 'Codigo incorrecto' };
    }

    // Limpiar el codigo de verificacion
    user.codigoVerificacion = null;
    await user.save();

    clearTimeout(this.reclaimTimer);
  }

  async forgotPasswordStep3(email: string, nuevaClave: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return {
        message: 'No se encontró ningún usuario con el email',
      };
    }

    // Actualizar la contraseña del usuario
    const claveHash = bcrypt.hashSync(nuevaClave, 10);
    user.clave = claveHash;
    await user.save();
  }

  private generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  private async sendCodeByEmail(email: string, code: string) {
    const message = {
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de recuperación de contraseña es: ${code}`,
      html: `
      <div style="background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #333;">Código de verificación</h2>
      <p>Tu código de recuperación de contraseña es: <strong>${code}</strong></p>
      <p>Utiliza este código para completar el proceso de recuperación de contraseña.</p>
      <p>Si no has solicitado una recuperación de contraseña, puedes ignorar este mensaje.</p>
    </div>
    `,
    };

    await this.mailerService.sendMail(message);
  }
}
