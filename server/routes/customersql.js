import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import connectAndQuery from "../configuration/db.js";
import archiver from "archiver";
import streamBuffers from "stream-buffers";

const router = express.Router();
const upload = multer(); // Define the upload variable here

router.post("/send-report", upload.single("file"), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).send("Email and file are required");
  }

  // Determine the file extension
  const fileExtension = file.originalname.split(".").pop();

  // Check if file size is greater than 9 MB
  const fileSizeInMB = file.size / (1024 * 1024);
  let fileBuffer = file.buffer;
  let fileName = `report.${fileExtension}`;

  if (fileSizeInMB > 9) {
    // Create a zip archive
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression level
    });

    const writableBuffer = new streamBuffers.WritableStreamBuffer({
      initialSize: 100 * 1024, // Start with 100 kilobytes
      incrementAmount: 10 * 1024, // Grow by 10 kilobytes each time buffer overflows
    });

    archive.pipe(writableBuffer);
    archive.append(file.buffer, { name: `report.${fileExtension}` });
    await archive.finalize();

    fileBuffer = writableBuffer.getContents();
    fileName = `report.zip`;
  }

  // Create a Nodemailer transporter using your email service
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true, // true for 465, false for other ports
  });

  // Verify the connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send("Error verifying email configuration: " + error.message);
    } else {
      console.log("Server is ready to take our messages");

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Report",
        text: "Please find attached report.",
        attachments: [
          {
            filename: fileName, // Dynamic filename based on file extension and compression
            content: fileBuffer,
          },
        ],
      };

      // Send email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          res.status(500).send("Error sending email: " + err.message);
        } else {
          console.log("Email sent successfully:", info.response);
          res.status(200).send("Email sent successfully");
        }
      });
    }
  });
});

// Add a report (SQL query and name) to an organization
router.post("/add-report", async (req, res) => {
  const { organizationId, name, query } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    organization.reports.push({ name, query });
    await organization.save();

    res
      .status(201)
      .json({ message: "Report added to organization", organization });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch reports by organization
router.post("/get-reports", async (req, res) => {
  const { orgId } = req.body;

  try {
    const organization = await Organization.findById(orgId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization.reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/execute-report", async (req, res) => {
  const { query } = req.body;
  try {
    const result = await connectAndQuery(query);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

export default router;
