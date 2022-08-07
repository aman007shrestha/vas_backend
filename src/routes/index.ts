import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import { protectRouteAccess } from "../middlewares/authenticate";
const router = Router();
router.use("/auth", authRoutes);
router.use("/users", protectRouteAccess, userRoutes);

export default router;
