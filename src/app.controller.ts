import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  constructor() {}

  @Get()
  index() {
    return 'hello word';
  }
}
