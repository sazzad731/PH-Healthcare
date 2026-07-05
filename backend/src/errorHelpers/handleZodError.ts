import status from "http-status";
import { z } from "zod";
import { TErrorResponse, TErrorSources } from "../types";

export const handleZodError = (error: z.ZodError): TErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Zod validation Error";

  const errorSources: TErrorSources[] = []

  error.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.length > 1 ? issue.path.join(" => ") : issue.path[0].toString(),
      message: issue.message,
    });
  });

  return {
    statusCode,
    success: false,
    message,
    errorSources
  }
}