import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.get("/me", AuthController.getMe);
router.patch("/me", AuthController.updateMe);
router.post("/verify/student-id", AuthController.verifyStudentId);
router.post("/verify/email", AuthController.verifyEmail);

export default router;
