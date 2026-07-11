import { Specialty } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload
  })

  return specialty
}



const getAllSpecialties = async (): Promise<Specialty[]> => { 
  const specialties = await prisma.specialty.findMany();
  return specialties
}



const updateSpecialty = async (payload: Specialty, id: string): Promise<Specialty> => {
  const result = await prisma.specialty.update({
    where: { id },
    data: {...payload}
  })

  return result
}



const deleteSpecialty = async (id: string): Promise<Specialty> => { 
  const specialty = await prisma.specialty.delete({
    where: {id}
  })

  return specialty
}



export const SpecialtyService = {
  createSpecialty,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty,
};