import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PermissionsModule } from './permissions/permissions.module';
import { MenuModule } from './menu/menu.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsuariosModule,
    CategoriasModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_NODEMAILER,
        auth: {
          user: process.env.USER_NODEMAILER,
          pass: process.env.PASS_NODEMAILER,
        },
      },
    }),
    CuestionariosModule,
    PermissionsModule,
    MenuModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
