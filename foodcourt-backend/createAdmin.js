import mongoose from "mongoose"
import dotenv from "dotenv"
import Admin from "./src/models/Admin.js"

dotenv.config()

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Admin.deleteMany({})

    const admin = new Admin({
      email: "admin@foodcourt.com",
      password: "Admin@123",
    })

    await admin.save()

    console.log("Admin recreated successfully")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()