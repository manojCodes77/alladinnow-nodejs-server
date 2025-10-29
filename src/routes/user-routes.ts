import { Router } from "express";
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  loginUser 
} from "../controllers/user-controller";

const router = Router();

// User routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
