import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Throw an error if unknown properties are present
    transform: true, // Automatically transform payloads to DTO classes
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
