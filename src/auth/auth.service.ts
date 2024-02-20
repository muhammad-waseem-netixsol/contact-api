/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateLoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { name, password, email } = createAuthDto;
      console.log('creating...', email);
      const alreadyExists = await this.authModel.findOne({ email: email });
      console.log(alreadyExists);
      if (alreadyExists) {
        console.log('exists');
        return {
          message:
            'User already exists! Please login or try a different email. ',
        };
      }
      const auth = new this.authModel();
      auth.name = name;
      auth.email = email;
      auth.password = password;
      return await auth.save();
    } catch (err) {
      return 'Server error';
    }
  }
// login
  async login(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto;
    console.log(email, password);
    const user = await this.authModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('User not found! Please sign up first.');
    }
    if (user.password !== password) {
      return { message: "Invalid password! Please try again with the correct one." };
    }
    
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
