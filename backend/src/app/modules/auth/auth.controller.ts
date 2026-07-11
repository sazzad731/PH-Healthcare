import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import { status } from "http-status";
import { tokenUtils } from "../../utils/token";

const registerPatient = catchAsync(
  async (req: Request, res: Response) => { 
    const payload = req.body;
    
    const result = await AuthService.registerPatient(payload);

    const { accessToken, refreshToken, token, ...rest } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookies(res, token as string);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Registration Successful",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    })
  }
)



const loginUser = catchAsync(
  async (req: Request, res: Response) => { 
    const payload = req.body;

    const result = await AuthService.loginUser(payload)

    const { accessToken, refreshToken, token, ...rest } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookies(res, token);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login success",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    })
  }
)



const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await AuthService.getMe(user);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result
    })
  }
)



export const AuthController = {
  registerPatient,
  loginUser,
  getMe,
};