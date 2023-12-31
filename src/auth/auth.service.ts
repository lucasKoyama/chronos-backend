import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatchingPasswords = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isMatchingPasswords) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      tags: user.tags,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
