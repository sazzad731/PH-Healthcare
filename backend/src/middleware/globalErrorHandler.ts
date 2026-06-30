/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env";
import { status } from "http-status";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => { 
  if (envConfig.NODE_ENV === 'development') {
    console.log("Global error ====>", err)
  }

  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err.message
  })
}