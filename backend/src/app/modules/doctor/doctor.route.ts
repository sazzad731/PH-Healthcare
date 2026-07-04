import { Router } from "express";
import { DoctorsController } from "./doctor.controller";

const router = Router();


router.get("/", DoctorsController.getAllDoctors)

router.get("/:id", DoctorsController.getADoctor)


export const DoctorsRouter = router;