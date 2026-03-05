import Gallery from "../models/Gallery.js"
import fs from "fs"
import path from "path"

/* ───────── UPLOAD IMAGE ───────── */
export const uploadImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" })
    }

    const newImage = await Gallery.create({
      image: `/uploads/${req.file.filename}`,
      title: req.body.title || "",
      featured: req.body.featured === "true"
    })

    /* If this image is featured → remove featured from others */
    if (newImage.featured) {
      await Gallery.updateMany(
        { _id: { $ne: newImage._id } },
        { featured: false }
      )
    }

    res.status(201).json(newImage)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to upload image" })
  }
}


/* ───────── GET GALLERY ───────── */
export const getGallery = async (req, res) => {
  try {

    const images = await Gallery.find({ isActive: true })
      .sort({ createdAt: -1 })

    res.json(images)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch gallery" })
  }
}


/* ───────── DELETE IMAGE ───────── */
export const deleteImage = async (req, res) => {
  try {

    const image = await Gallery.findById(req.params.id)

    if (!image) {
      return res.status(404).json({ message: "Image not found" })
    }

    /* Delete file from uploads folder */
    const filePath = path.join(
      process.cwd(),
      image.image.replace("/", "")
    )

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    await image.deleteOne()

    res.json({ message: "Image deleted successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to delete image" })
  }
}