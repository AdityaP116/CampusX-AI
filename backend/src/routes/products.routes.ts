import { Router } from "express";
import { ProductsController } from "../controllers/products.controller";

const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/trending", ProductsController.getTrendingProducts);
router.get("/seller/:sellerId", ProductsController.getProductsBySeller);
router.get("/:id", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.patch("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);
router.post("/:id/report", ProductsController.reportProduct);

export default router;
