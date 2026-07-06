import { Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import { status } from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

const createDoctor = catchAsync(
  async (req: Request, res: Response) => { 
    const payload = req.body;

    const result = await UserService.createDoctor(payload);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Doctor registered successfully",
      data: result
    })
  }
)


export const UserController = {
  createDoctor
}