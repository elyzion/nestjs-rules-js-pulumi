import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello-world')
  getHello(): string {
    console.log('Hello World!');
    console.log(this.appService);
    return this.appService.getHello();
  }
}
