import nodemailer from "nodemailer";

// Function to send password reset email
export const sendPasswordResetEmail = async (recipientEmail, token) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Password Reset Request",
      html: `
        <p>You are receiving this email because you (or someone else) has requested to reset the password for your account.</p>
        <p>Please click the following link to reset your password:</p>
        <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
