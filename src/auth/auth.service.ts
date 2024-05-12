import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private configService: ConfigService, private jwtService:JwtService, private userService: UserService){

    }


    // async findUserByEmail(email:string){
    //     return await this.userService.findUserByEmail(email);
    // }


  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string, expiresIn: string | undefined  }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {  email: user.email, _id: user._id};

    const token =  await this.jwtService.signAsync(payload , {
      // secret: 'SOME_SECRET_KEY',
      secret: this.configService.get<string>('SECRET_KEY') ,
      expiresIn: this.configService.get<string>('TOKEN_EXPIRY_PERIOD')
    });
  
    return {
      access_token: token,
      expiresIn: this.configService.get<string>('TOKEN_EXPIRY_PERIOD')
    };
  }
}