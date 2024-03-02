import { Router } from "express";
import {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controller/address.controller.js";
// Get all addresses
const router = Router();
router.get("/", getAddress);
router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
