import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class CommanderGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {    
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request.headers.authorization);    
    if (!token) {      
      throw new UnauthorizedException();
    }
    try {      
      const payload = await this.jwtService.verifyAsync(token);                  
      if (payload.role == "Commander") {
        request['user'] = payload;
        return true
      }
      return false
    }
    catch {      
      throw new UnauthorizedException();
    }
  }

  private extractToken(authorizationHeader?: string): string | undefined {
    if (!authorizationHeader) {
      return undefined;
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type?.toLowerCase() === 'bearer' && token) {
      return token;
    }
    return authorizationHeader;
  }
}

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request.headers.authorization);
    if (!token) {      
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);  
      request['user'] = payload;          
      return true
      }
    catch {      
      throw new UnauthorizedException();
    }
  }

  private extractToken(authorizationHeader?: string): string | undefined {
    if (!authorizationHeader) {
      return undefined;
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type?.toLowerCase() === 'bearer' && token) {
      return token;
    }
    return authorizationHeader;
  }
}
