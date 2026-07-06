/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env";
import { status } from "http-status";
import { z } from "zod";
import { TErrorSources } from "../types";
import { handleZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/AppError";



export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => { 
  if (envConfig.NODE_ENV === 'development') {
    console.log("Global error ====>", err)
  }

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack: string | undefined = undefined;

  if (err instanceof z.ZodError)
  {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [ ...simplifiedError.errorSources ];
    stack = err.stack;
  } else if (err instanceof AppError) { 
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ]
  } else if (err instanceof Error){
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    error: envConfig.NODE_ENV === "development" ? err : undefined,
    stack: envConfig.NODE_ENV === "development" ? stack : undefined
  })
}