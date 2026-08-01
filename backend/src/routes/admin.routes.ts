import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();

router.get("/stats", AdminController.getStats);
router.get("/users", AdminController.getUsers);
router.patch("/users/:userId/verify", AdminController.verifyUser);
router.patch("/users/:userId/role", AdminController.updateUserRole);
router.get("/listings", AdminController.getListings);
router.delete("/listings/:productId", AdminController.deleteListing);
router.get("/reports", AdminController.getReports);
router.patch("/reports/:reportId/resolve", AdminController.resolveReport);

export default router;
