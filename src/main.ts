import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Config
  app.setGlobalPrefix('api');
  app.enableCors(); // Enable CORS
  
  // Validation Pipe Global Configuration
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Simulador del Ahorro Digital API')
    .setDescription('API para simulación de productos de ahorro e inversión')
    .setVersion('1.0')
    .addTag('Products')
    .addTag('Simulator')
    .addTag('Onboarding')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log(`Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
