import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log('Validation errors:', errors);
        const messages = errors.map((err) => {
          if (err.constraints) {
            return Object.values(err.constraints).join(', ');
          }
          return `${err.property} is invalid`;
        });
        return new BadRequestException({
          statusCode: 400,
          message: messages.length === 1 ? messages[0] : messages,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
