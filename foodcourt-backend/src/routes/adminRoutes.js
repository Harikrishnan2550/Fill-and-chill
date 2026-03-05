import express from "express"
import {
  loginAdmin,
  getAdminStats,
  changePassword,
} from "../controllers/adminController.js"
import protect from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/stats", protect, getAdminStats)

// 🔐 Change Password
router.put("/change-password", protect, changePassword)

export default router