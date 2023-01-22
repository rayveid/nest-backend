import { Injectable } from '@nestjs/common';

@Injectable({})
export class AppService {
  getUsers() {
    return [
      { id: 1, name: 'test' },
      { id: 2, name: 'test 2' },
    ];
  }
}
