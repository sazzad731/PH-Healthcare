import { status } from "http-status";
import AppError from "../../../errorHelpers/AppError";
import { UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { tokenUtils } from "../../../utils/token";



interface IRegisterPatientPayload { 
  name: string;
  email: string;
  password: string
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      deletedAt: new Date,
    },
  });

  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register patient");
  }

  // Create Patient Profile in Transaction After Sign up of Patient In User Model
  try {
    const patient = await prisma.$transaction(async (tx) => {
      return await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
    });


    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      isDeleted: data.user.isDeleted,
      status: data.user.status,
      emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      isDeleted: data.user.isDeleted,
      status: data.user.status,
      emailVerified: data.user.emailVerified,
    });


    return { ...data, accessToken, refreshToken, patient };
  } catch (error) {
    console.log("Transaction error: ", error)
    await prisma.user.delete({
      where: {
        id: data.user.id
      }
    })
    throw error;
  }
};



interface ILoginUserPayload { 
  email: string,
  password: string
}

const loginUser = async (payload: ILoginUserPayload) =>{
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  })

  if (data.user.status === UserStatus.BLOCKED) { 
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) { 
    throw new AppError(status.NOT_FOUND, "User is deleted")
  }


  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
    isDeleted: data.user.isDeleted,
    status: data.user.status,
    emailVerified: data.user.emailVerified,
  })

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
    isDeleted: data.user.isDeleted,
    status: data.user.status,
    emailVerified: data.user.emailVerified,
  })


  return {
    ...data,
    accessToken,
    refreshToken
  };
}


export const AuthService = {
  registerPatient,
  loginUser
}