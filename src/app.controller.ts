import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {} // инджектим сервис

  @Get('/users') // метод, которым обращаемся
  getUsers() {
    return this.appService.getUsers(); // логика обработки вынесена в сервис
  }
}
