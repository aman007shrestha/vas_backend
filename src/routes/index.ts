import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import registrationRoutes from "./registrationRoutes";
import {
  protectRouteAccess,
  AdminOnlyRoutes,
} from "../middlewares/authenticate";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", AdminOnlyRoutes, userRoutes);
router.use("/registration", protectRouteAccess, registrationRoutes);

export default router;
