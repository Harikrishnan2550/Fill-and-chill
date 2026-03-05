import express from "express"
import {
  createShop,
  getShops,
  updateShop,
  deleteShop,
} from "../controllers/shopController.js"
import protect from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js"

const router = express.Router()

/* ───────── PUBLIC ───────── */
router.get("/", getShops)

/* ───────── ADMIN PROTECTED ───────── */

// Create shop with image
router.post(
  "/",
  protect,
  upload.single("image"),   // 👈 image field name must match frontend
  createShop
)

// Update shop with optional image replace
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateShop
)

// Delete shop
router.delete("/:id", protect, deleteShop)

export default router