import multer from "multer"
import path from "path"
import fs from "fs"

// Ensure uploads folder exists
const uploadDir = "uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`
    )
  },
})

// File filter (images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mime = allowedTypes.test(file.mimetype)

  if (ext && mime) {
    cb(null, true)
  } else {
    cb(
      new Error("Invalid file type. Only jpeg, jpg, png, webp allowed"),
      false
    )
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

export default upload