/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log("Error from catchAsync =====>", error);
      
      // res.send এর জায়গায় res.status ব্যবহার করা হয়েছে
      res.status(error?.statusCode || 500).json({
        success: false,
        message: error?.message || "Something went wrong!",
        error: error,
      });
    }
  };
};
