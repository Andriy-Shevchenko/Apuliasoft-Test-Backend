import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationException } from './exceptions/validation.exception';
import { errorMessagesFromValidator } from './shared/utils/error-messages-from-validator';
import { ValidationFilter } from './exceptions/validation.filter';
import { API_PREFIX, PORT } from "./shared/constants/config.constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(
          errors.reduce(errorMessagesFromValidator, {}),
        );
      },
    }),
  );

  await app.listen(PORT, () => {
    console.log(`Server started listening on PORT: ${PORT}`);
  });
}
bootstrap();
