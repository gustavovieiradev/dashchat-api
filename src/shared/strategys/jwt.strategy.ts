import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../modules/autenticacao/services/auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as configJwt from '../config-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configJwt.JWT_SECRETO,
            ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
