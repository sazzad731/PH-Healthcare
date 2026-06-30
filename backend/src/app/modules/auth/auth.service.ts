import { UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";



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
    throw new Error("Failed to register patient");
  }

  // Create Patient Profile in Transaction After Sign up of Patient In User Model
  const patient = await prisma.$transaction(async (tx) => { 
    return await tx.patient.create({
      data: {
        userId: data.user.id,
        name: payload.name,
        email: payload.email,
      }
    })
  })
  
  return {...data, patient}
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
    throw new Error("User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) { 
    throw new Error("User is deleted")
  }

  return data;
}


export const AuthService = {
  registerPatient,
  loginUser
}