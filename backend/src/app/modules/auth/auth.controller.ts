import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import { status } from "http-status";

const registerPatient = catchAsync(
  async (req: Request, res: Response) => { 
    const payload = req.body;
    
    const result = await AuthService.registerPatient(payload);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Registration Successful",
      data: result
    })
  }
)



const loginUser = catchAsync(
  async (req: Request, res: Response) => { 
    const payload = req.body;

    const result = await AuthService.loginUser(payload)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login success",
      data: result
    })
  }
)


export const AuthController = {
  registerPatient,
  loginUser,
};