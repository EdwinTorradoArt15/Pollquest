import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/usuario.entity';
import { LocalStrategy } from './local.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/jwt-constans';
import { JwtStrategy } from './jwt.strategy';
/* import { JwtStrategy } from './jwt.strategy';
 */

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, LocalStrategy, JwtStrategy],
})
export class UsuariosModule {}
