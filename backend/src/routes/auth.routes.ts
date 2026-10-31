import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { authRateLimiter } from "../middlewares/rate-limiter.middleware";
import { authValidators } from "../validators";

const router = Router();

router.post("/register", authenticate, authRateLimiter, validateRequest(authValidators.register), AuthController.register);
router.get("/me", authenticate, AuthController.getMe);
router.patch("/me", authenticate, validateRequest(authValidators.updateProfile), AuthController.updateMe);
router.post("/verify/student-id", authenticate, AuthController.verifyStudentId);
router.post("/send-otp", authenticate, authRateLimiter, validateRequest(authValidators.sendOtp), AuthController.sendOtp);
router.post("/verify-otp", authenticate, authRateLimiter, validateRequest(authValidators.verifyOtp), AuthController.verifyOtp);

export default router;
