import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { DoctorsRouter } from "../modules/doctor/doctor.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = Router();


const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtyRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/doctors",
    route: DoctorsRouter
  },
  {
    path: "/admin",
    route: AdminRoutes
  }
];


routerManager.forEach((r)=> router.use(r.path, r.route))


export const IndexRoutes = router;