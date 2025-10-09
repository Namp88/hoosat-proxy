import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Response format for all API endpoints
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  path: string;
}

/**
 * Interceptor to standardize all API responses
 * Wraps successful responses and handles BaseResult format from hoosat-sdk
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    return next.handle().pipe(
      map(data => {
        // Handle BaseResult format from hoosat-sdk
        if (data && typeof data === 'object' && 'ok' in data && 'result' in data) {
          if (!data.ok) {
            throw new HttpException(data.error || 'Operation failed', HttpStatus.BAD_REQUEST);
          }

          return {
            success: true,
            data: data.result,
            timestamp: new Date().toISOString(),
            path,
          };
        }

        // Handle regular responses
        return {
          success: true,
          data,
          timestamp: new Date().toISOString(),
          path,
        };
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
