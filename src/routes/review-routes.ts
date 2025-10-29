import { Router } from "express";
import { 
  createReview, 
  getAllReviews, 
  getReviewById, 
  updateReview, 
  approveReview,
  deleteReview 
} from "../controllers/review-controller";

const router = Router();

// Review routes
router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.patch("/:id/approve", approveReview);
router.delete("/:id", deleteReview);

export default router;
