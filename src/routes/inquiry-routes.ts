import { Router } from "express";
import { 
  createInquiry, 
  getAllInquiries, 
  getInquiryById, 
  updateInquiry, 
  updateInquiryStatus,
  deleteInquiry 
} from "../controllers/inquiry-controller";

const router = Router();

// Inquiry routes
router.post("/", createInquiry);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.put("/:id", updateInquiry);
router.patch("/:id/status", updateInquiryStatus);
router.delete("/:id", deleteInquiry);

export default router;
