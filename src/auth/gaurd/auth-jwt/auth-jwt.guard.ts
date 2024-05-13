import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { omit} from 'lodash';

@Injectable()
export class AuthJwtGuard implements CanActivate {
   readonly logger = new Logger(AuthJwtGuard.name);


  constructor(private jwtService: JwtService, private configService: ConfigService){

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('SECRET_KEY')
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const safeUserData = omit(payload, ['password']);
      this.logger.debug(`User on request is set to \n${JSON.stringify(safeUserData)}`);
      request['user'] = safeUserData;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }


 
}