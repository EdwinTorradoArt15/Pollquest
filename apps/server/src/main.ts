import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  await app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      /*     forbidNonWhitelisted: true, */
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación de la api de quizzapp')
    .setDescription('Aca esta la información de los puntos de la aplicación')
    .setVersion('1.0')
    .addTag('quizzapp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
