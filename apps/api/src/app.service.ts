import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'E-commerce API is running',
    };
  }
}
