import { sendEmail } from "../utils/sendEmail.js"

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body

    await sendEmail({
      to: "info@foodandchill.in",
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    })

    res.json({ success: true, message: "Email sent successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Email failed" })
  }
}