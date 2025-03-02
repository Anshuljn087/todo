import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signup(email: string, password: string) {
    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashedPassword);

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async directLogin(email: string, password: string) {
    const user:UserDocument = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const secret = process.env.JWT_SECRET;
    const token = this.jwtService.sign({ userId: user._id, email: user.email }, {secret});

    return {
      message: 'Login successful',
      userId: user._id,
      token,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async googleLogin(user: any) {
    if (!user) throw new UnauthorizedException();
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      await this.usersService.createWithGoogle(user.email, user.googleId);
    }
    return this.login(user);
  }
}
