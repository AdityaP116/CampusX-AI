import { Router } from "express";
import authRoutes from "./auth.routes";
import productsRoutes from "./products.routes";
import chatRoutes from "./chat.routes";
import wishlistRoutes from "./wishlist.routes";
import notificationsRoutes from "./notifications.routes";
import adminRoutes from "./admin.routes";
import reviewsRoutes from "./reviews.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/chat", chatRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/admin", adminRoutes);
router.use("/reviews", reviewsRoutes);

export default router;
