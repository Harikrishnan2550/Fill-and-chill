import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import connectDB from "./config/db.js"
import shopRoutes from "./routes/shopRoutes.js"
import galleryRoutes from "./routes/galleryRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"

dotenv.config()

// Connect MongoDB
connectDB()

const app = express()

/* ───────── MIDDLEWARES ───────── */

// Better CORS (production ready)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use(express.json())

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
)

/* ───────── ROUTES ───────── */

app.get("/", (req, res) => {
  res.json({ message: "Food Court Backend Running 🚀" })
})

app.use("/api/shops", shopRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/contact", contactRoutes)

/* ───────── ERROR HANDLER ───────── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong" })
})

/* ───────── START SERVER ───────── */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})