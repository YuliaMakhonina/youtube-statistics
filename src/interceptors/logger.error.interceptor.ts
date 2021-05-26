import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(
        (val) => val,
        async (err) => {
          if (err.response.statusCode) {
            err.response = [
              {
                code: err.response.statusCode,
                description: err.response.message,
              },
            ];
          }
          return throwError(err);
        },
      ),
    );
  }
}