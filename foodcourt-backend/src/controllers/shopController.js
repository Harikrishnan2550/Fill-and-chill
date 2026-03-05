import Shop from "../models/Shop.js"
import fs from "fs"
import path from "path"

/* ───────── CREATE SHOP ───────── */
export const createShop = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      shortDescription,
      longDescription,
      openTime,
      closeTime,
      rating,
      phone,
    } = req.body

    const shop = await Shop.create({
      name,
      cuisine,
      shortDescription,
      longDescription,
      openTime,
      closeTime,
      rating,
      phone,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    })

    res.status(201).json(shop)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

/* ───────── GET ALL SHOPS ───────── */
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find({ isActive: true }).sort({
      createdAt: -1,
    })

    res.json(shops)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* ───────── UPDATE SHOP ───────── */
export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    // If new image uploaded → delete old image
    if (req.file && shop.image) {
      const oldPath = path.join(".", shop.image)
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath)
      }
    }

    // Update fields
    shop.name = req.body.name || shop.name
    shop.cuisine = req.body.cuisine || shop.cuisine
    shop.shortDescription =
      req.body.shortDescription || shop.shortDescription
    shop.longDescription =
      req.body.longDescription || shop.longDescription
    shop.openTime = req.body.openTime || shop.openTime
    shop.closeTime = req.body.closeTime || shop.closeTime
    shop.rating = req.body.rating || shop.rating
    shop.phone = req.body.phone || shop.phone

    if (req.file) {
      shop.image = `/uploads/${req.file.filename}`
    }

    const updatedShop = await shop.save()

    res.json(updatedShop)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

/* ───────── DELETE SHOP ───────── */
export const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    // Delete image file
    if (shop.image) {
      const filePath = path.join(".", shop.image)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    await shop.deleteOne()

    res.json({ message: "Shop deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}