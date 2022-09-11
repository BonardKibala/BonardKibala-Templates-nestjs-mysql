import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test Orange Rdc by Bonard Kibala Inkumbwa')
    .setDescription('CRUD')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, doc);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transformer les paramettre en type de données souhaité
      whitelist: true, //Ne récupérer que les paramettre définie dans les validateurs
      forbidNonWhitelisted: true, //déclancher l'érreur s'il y a des paramettres non souhaité
    }),
  );

  await app.listen(process.env.PORT, () => {
    console.log(
      `Démarrage du serveur sur le ${process.env.PORT} 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`,
    );
  });
}
bootstrap();
