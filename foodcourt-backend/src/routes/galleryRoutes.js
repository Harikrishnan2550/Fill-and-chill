import express from "express"
import upload from "../middlewares/upload.js"
import {
  uploadImage,
  getGallery,
  deleteImage,
} from "../controllers/galleryController.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router()

// Public
router.get("/", getGallery)

// Admin only
router.post("/", protect, upload.single("image"), uploadImage)
router.delete("/:id", protect, deleteImage)

export default router