import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";

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
];


routerManager.forEach((r)=> router.use(r.path, r.route))


export const IndexRoutes = router;