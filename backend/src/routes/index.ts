import { Router } from "express";
import authRoutes from "./auth.routes";
import productsRoutes from "./products.routes";
import chatRoutes from "./chat.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/chat", chatRoutes);

export default router;
