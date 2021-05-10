import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {Injectable} from '@nestjs/common';
import {Md5} from 'md5-typescript';
import * as configJwt from '../../../shared/config-jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async createToken(name, email, image, roles: string[]) {
        const user: JwtPayload = {
            name,
            email: email,
            image: image,
            roles: roles
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        // return await this.accountService.findOneByUsername(payload.username);
        //TODO buscar usuario no banco para ver esta tudo correto
        return payload;
    }

    async transformPasswordMd5(password): Promise<string> {
        return Md5.init(`${password}${configJwt.JWT_SECRETO}`);
    }
}
