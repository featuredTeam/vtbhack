import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { EntityNotFoundError } from 'typeorm';
import { Request, Response } from 'express';

export type ExceptionType =
  | HttpException
  | BadRequestException
  | EntityNotFoundError
  | Error;

export type BadRequestResponseType = string | { message: string };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: ExceptionType, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode, message;

    if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as BadRequestResponseType;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = exceptionResponse.message;
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof AxiosError) {
      statusCode = exception.response.status;
      message = exception.response.data.message;
    } else if (exception instanceof EntityNotFoundError) {
      statusCode = 404;
      message = exception.message;
    } else {
      statusCode = 500;
      message = 'Internal server error';
    }

    const { url, method, body } = request;

    console.error(
      {
        url,
        method,
        body,
        message,
        statusCode,
      },
      exception,
    );

    response.statusCode = statusCode;

    response.send({
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
