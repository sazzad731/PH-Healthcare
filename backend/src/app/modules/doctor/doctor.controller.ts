import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../../shared/sendResponse";
import { status } from "http-status";

const getAllDoctors = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorServices.getAllDoctors();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctors Fetched successfully",
      data: result
    })
  }
)


const getADoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorServices.getADoctor(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Fetched successfully",
    data: result,
  });
});


export const DoctorsController = {
  getAllDoctors,
  getADoctor
}