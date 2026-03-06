import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
})

transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Failed ❌", error)
  } else {
    console.log("Brevo SMTP Ready ✅")
  }
})

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Food & Chill" <info@foodandchill.in>`,
      to,
      subject,
      html,
    })

    console.log("Email sent:", info.messageId)
    return info
  } catch (error) {
    console.error("Email sending failed ❌", error)
    throw error
  }
}