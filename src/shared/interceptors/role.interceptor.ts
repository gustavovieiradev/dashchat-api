import {Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultadoDto } from '../dtos/resultado.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log('intercept', payload);
        // console.log('this.roles', this.roles);
        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if (!hasRole) {
            throw new HttpException(
                new ResultadoDto('Acesso não autorizado', false, null, null),
                HttpStatus.UNAUTHORIZED);
        }

        return next
            .handle()
            .pipe(map(value => value === null ? '' : value ));
    }
}
