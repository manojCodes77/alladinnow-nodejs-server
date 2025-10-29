import { Router } from "express";
import { 
  createProductImage, 
  getAllProductImages, 
  getProductImageById, 
  updateProductImage, 
  deleteProductImage,
  setPrimaryImage 
} from "../controllers/product-image-controller";

const router = Router();

// Product Image routes
router.post("/", createProductImage);
router.get("/", getAllProductImages);
router.get("/:id", getProductImageById);
router.put("/:id", updateProductImage);
router.patch("/:id/set-primary", setPrimaryImage);
router.delete("/:id", deleteProductImage);

export default router;
