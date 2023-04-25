import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Listening on 0.0.0.0:8080");
  await app.listen(8080, "0.0.0.0");
}
bootstrap();
