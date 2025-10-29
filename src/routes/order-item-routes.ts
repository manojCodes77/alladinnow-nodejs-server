import { Router } from "express";
import { 
  createOrderItem, 
  getAllOrderItems, 
  getOrderItemById, 
  updateOrderItem, 
  deleteOrderItem 
} from "../controllers/order-item-controller";

const router = Router();

// Order Item routes
router.post("/", createOrderItem);
router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

export default router;
