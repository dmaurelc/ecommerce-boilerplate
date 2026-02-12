import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(_token: string) {
    // TODO: Implementar validación con NextAuth/JWT
    return { userId: 'user-123', email: 'user@example.com' };
  }
}
