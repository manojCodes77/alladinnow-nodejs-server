import { Router } from "express";
import { getAllBusinessTypes } from "../controllers/business-types-controller";

const router = Router();

router.get("/", getAllBusinessTypes);
// router.get("/:id", getBusinessTypeById);
// router.post("/", createBusinessType);
// router.put("/:id", updateBusinessType);
// router.delete("/:id", deleteBusinessType);

export default router;