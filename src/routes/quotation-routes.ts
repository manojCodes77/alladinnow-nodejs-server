import { Router } from "express";
import { 
  createQuotation, 
  getAllQuotations, 
  getQuotationById, 
  updateQuotation, 
  updateQuotationStatus,
  deleteQuotation 
} from "../controllers/quotation-controller";

const router = Router();

// Quotation routes
router.post("/", createQuotation);
router.get("/", getAllQuotations);
router.get("/:id", getQuotationById);
router.put("/:id", updateQuotation);
router.patch("/:id/status", updateQuotationStatus);
router.delete("/:id", deleteQuotation);

export default router;
