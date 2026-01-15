// Infrastructure Layer - HTTP Controller
import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { GetCurrentUserUseCase } from '../../../application/use-cases/auth/get-current-user.use-case';
import { LoginDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { JwtPayload } from '../strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginUseCase.execute(loginDto);

    // Set httpOnly cookie for security
    // En desarrollo con diferentes puertos, usamos sameSite: 'lax' que funciona para navegación top-level
    // Para producción, usar 'strict' o 'none' con secure: true
    response.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // Asegurar que la cookie se envía para todas las rutas
    });

    // También devolvemos el token en la respuesta para que el frontend pueda usarlo
    // en peticiones AJAX donde las cookies cross-origin no funcionan bien en desarrollo
    return {
      message: 'Login exitoso',
      user: result.user,
      accessToken: result.accessToken, // El frontend lo usará para enviar en el header
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { message: 'Logout exitoso' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: JwtPayload) {
    return this.getCurrentUserUseCase.execute(user.sub);
  }
}
