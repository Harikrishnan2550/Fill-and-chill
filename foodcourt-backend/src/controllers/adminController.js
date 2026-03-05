import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Shop from "../models/Shop.js"
import Gallery from "../models/Gallery.js"

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  console.log("Incoming login:", email)

  const admin = await Admin.findOne({ email })
  console.log("Admin found:", admin)

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const isMatch = await bcrypt.compare(password, admin.password)
  console.log("Password match:", isMatch)

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({ token })
}

export const getAdminStats = async (req, res) => {
  const shops = await Shop.countDocuments()
  const gallery = await Gallery.countDocuments()

  res.json({ shops, gallery })
}


export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      })
    }

    // Get admin from token
    const admin = await Admin.findById(req.adminId)
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" })
    }

    // Update password (hash handled by pre-save hook)
    admin.password = newPassword
    await admin.save()

    res.json({ message: "Password updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}