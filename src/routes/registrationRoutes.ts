import { Router } from "express";
import * as registrationController from "../controllers/registrationController";

const router = Router();

router.get("/", registrationController.getAllRegistrations);
router.post("/", registrationController.createRegistration);
export default router;
