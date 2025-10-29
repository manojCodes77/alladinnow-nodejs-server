import { Router } from "express";
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrder, 
  updateOrderStatus,
  deleteOrder 
} from "../controllers/order-controller";

const router = Router();

// Order routes
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
