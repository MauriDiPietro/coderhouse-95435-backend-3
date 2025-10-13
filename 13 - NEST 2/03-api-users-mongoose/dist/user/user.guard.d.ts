import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class UserGuard implements CanActivate {
    private JwtService;
    constructor(JwtService: JwtService);
    private extractTokenFromHeader;
    private extractTokenFromCookies;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
