import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSeesion = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSeesion({
    //加密
    keys:['dsad']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      //白名单开启，即不传入无关属性，即不把附加的一些属性传入，为了安全考虑 
      whitelist: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
