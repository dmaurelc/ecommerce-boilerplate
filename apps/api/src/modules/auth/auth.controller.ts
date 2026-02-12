import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validar token de autenticación' })
  async validate(@Body('token') token: string) {
    return await this.authService.validateUser(token);
  }

  @Get('session')
  @ApiOperation({ summary: 'Obtener sesión actual' })
  async getSession(@Headers() headers: Record<string, string>) {
    const authHeader = headers['authorization'];
    // TODO: Implementar lógica de sesión
    return { authenticated: !!authHeader };
  }
}
