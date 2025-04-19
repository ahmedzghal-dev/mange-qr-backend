import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Enable CORS
  app.enableCors();
  
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Mange QR API')
    .setDescription('API for Mange QR application')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
