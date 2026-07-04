/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env";
import { status } from "http-status";
import { z } from "zod";
import { TErrorSources } from "../types";
import { handleZodError } from "../errorHalpers/handleZodError";



export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => { 
  if (envConfig.NODE_ENV === 'development') {
    console.log("Global error ====>", err)
  }

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error"

  if (err instanceof z.ZodError) { 
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources]
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: envConfig.NODE_ENV === "development" ? err : undefined,
    errorSources
  })
}