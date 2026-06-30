import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();


const routerManager = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/specialties",
    route: SpecialtyRoutes
  }
]


routerManager.forEach((r)=> router.use(r.path, r.route))


export const IndexRoutes = router;