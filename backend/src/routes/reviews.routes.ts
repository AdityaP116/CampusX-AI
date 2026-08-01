import { Router } from "express";
import { ReviewsController } from "../controllers/reviews.controller";

const router = Router();

router.get("/user/:userId", ReviewsController.getUserReviews);
router.post("/", ReviewsController.createReview);
router.get("/:reviewId", ReviewsController.getReviewById);

export default router;
