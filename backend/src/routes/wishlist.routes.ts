import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller";

const router = Router();

router.get("/", WishlistController.getWishlist);
router.post("/", WishlistController.addToWishlist);
router.delete("/:productId", WishlistController.removeFromWishlist);
router.get("/check/:productId", WishlistController.checkWishlistStatus);

export default router;
