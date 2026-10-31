import { Router } from "express";
import { ProductsController } from "../controllers/products.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { createListingRateLimiter } from "../middlewares/rate-limiter.middleware";
import { productValidators } from "../validators";

const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/trending", ProductsController.getTrendingProducts);
router.get("/seller/:sellerId", ProductsController.getProductsBySeller);
router.get("/:id", ProductsController.getProductById);
router.post("/", authenticate, createListingRateLimiter, validateRequest(productValidators.create), ProductsController.createProduct);
router.patch("/:id", authenticate, validateRequest(productValidators.update), ProductsController.updateProduct);
router.delete("/:id", authenticate, ProductsController.deleteProduct);
router.post("/:id/report", authenticate, ProductsController.reportProduct);

export default router;
