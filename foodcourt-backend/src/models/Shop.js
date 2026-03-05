import mongoose from "mongoose"

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    // 🔹 Short description (inside image)
    shortDescription: {
      type: String,
    },

    // 🔹 Long description (below image)
    longDescription: {
      type: String,
    },

    image: {
      type: String,
    },

    openTime: {
      type: String, // Example: "11:00 AM"
    },

    closeTime: {
      type: String, // Example: "11:00 PM"
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    // ✅ WhatsApp number
    phone: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Shop = mongoose.model("Shop", shopSchema)

export default Shop