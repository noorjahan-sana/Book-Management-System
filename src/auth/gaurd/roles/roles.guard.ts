
import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    this.logger.log(`Roles guard`);
    this.logger.debug(user, requiredRoles);

    const hasRole = () => user.roles.some((role:Role) => requiredRoles.includes(role));
    if (!user) {
      throw new UnauthorizedException(`The user is not logged in.`);
    }
    if (!(user.roles && hasRole())) {
      throw new ForbiddenException(`Forbidden, the user doesn't have the required roles ${requiredRoles.join(',')}`);
    }
    return user && user.roles && hasRole();

    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

