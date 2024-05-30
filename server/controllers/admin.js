import { register } from "./auth.js"; // Assuming the register function is exported from auth.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Report from "../models/Report.js";

// Function to create a new user by admin
export const createUser = async (req, res) => {
  try {
    // Call the register function from auth.js with the request and response objects
    await register(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to modify an existing user by admin
// export const modifyUser = async (req, res) => {
//   try {
//     const userId = req.body.userId; // Assuming the user's MongoDB _id is passed as a parameter in the request body
//     const { firstName, lastName, email, password, role } = req.body;

//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);

//     // Find the user by MongoDB _id and update their details
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         firstName,
//         lastName,
//         email,
//         password: passwordHash, // Again, password should be hashed before updating in the database
//         role,
//       },
//       { new: true } // Return the updated user object
//     );
//     const savedUser = await updatedUser.save();

//     if (!updatedUser) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.status(200).json(updatedUser); // Return the updated user object
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const modifyUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Check if the request body contains the email field
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const existingUser = await User.findOne({ email });

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user information
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;

    // Check if the password field is present and update it
    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      existingUser.password = passwordHash;
    }

    // Save the updated user
    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser); // Return the updated user object
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const email = req.body.email; // Extracting email from the request body

    // Check if the request body contains the email field
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const existingUser = await User.findOne({ email });

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the user from the database
    const removedUser = await User.deleteOne({ email });

    if (!removedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addOrganization = async (req, res) => {
  try {
    const {
      name,
      industry,
      address,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email,
      website,
      contactPerson,
      contactPersonTitle,
      additionalNotes,
    } = req.body;

    // Create a new organization object
    const newOrganization = new Organization({
      name,
      industry,
      address,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email,
      website,
      contactPerson,
      contactPersonTitle,
      additionalNotes,
    });

    // Save the new organization to the database
    const savedOrganization = await newOrganization.save();

    res.status(201).json(savedOrganization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const modifyOrganization = async (req, res) => {
  try {
    //const organizationId = req.params.id;
    const {
      name,
      industry,
      address,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email,
      website,
      contactPerson,
      contactPersonTitle,
      additionalNotes,
    } = req.body;

    // Check if the request body contains the email field
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const existingOrg = await Organization.findOne({ email });

    console.log(existingOrg);

    // Check if the org exists
    if (!existingOrg) {
      return res.status(404).json({ error: "Org not found" });
    }

    existingOrg.name = name;
    existingOrg.industry = industry;
    existingOrg.address = address;
    existingOrg.city = city;
    existingOrg.state = state;
    existingOrg.country = country;
    existingOrg.postalCode = postalCode;
    existingOrg.phoneNumber = phoneNumber;
    existingOrg.website = website;
    existingOrg.contactPerson = contactPerson;
    existingOrg.contactPersonTitle = contactPersonTitle;
    existingOrg.additionalNotes = additionalNotes;

    console.log("bhai bs yr modifyyyy");

    // Save the updated user
    const updatedOrg = await existingOrg.save();

    // if (!updatedOrganization) {
    //   return res.status(404).json({ msg: "Organization not found" });
    // }

    res.status(200).json(updatedOrg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeOrganization = async (req, res) => {
  try {
    //const organizationId = req.params.id;

    console.log("imrannnn");
    const id = req.body.id;

    // Find the organization by ID and remove it from the database
    const removedOrganization = await Organization.findByIdAndDelete(id);

    if (!removedOrganization) {
      return res.status(404).json({ msg: "Organization not found" });
    }

    res.status(200).json({ msg: "Organization removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    // Fetch all organizations from the database
    const organizations = await Organization.find({}, "name");

    if (!organizations || organizations.length === 0) {
      return res.status(404).json({ msg: "No organizations found" });
    }

    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Report Managament

// export const createReport = async (req, res) => {
//   const { title, description, URL, createdByEmail } = req.body;

//   if (!title || !description || !URL || !createdByEmail) {
//     return res.status(400).send("All fields are required");
//   }

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email: createdByEmail });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const report = new Report({ title, description, URL, createdBy: user._id });
//     console.log("Hi");
//     await report.save();
//     res.status(201).send(report);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// export const assignReport = async (req, res) => {
//   const { reportURL, customerEmail } = req.body;

//   if (!reportURL || !customerEmail) {
//     return res
//       .status(400)
//       .send("Both reportURL and customerEmail are required");
//   }

//   try {
//     // Find the report by URL
//     const report = await Report.findOne({ URL: reportURL });
//     if (!report) {
//       return res.status(404).send("Report not found");
//     }

//     // Find the customer by email
//     const customer = await User.findOne({ email: customerEmail });
//     if (!customer) {
//       return res.status(404).send("Customer not found");
//     }

//     // Check if the report is already assigned to the customer
//     if (!report.customers.includes(customer._id)) {
//       report.customers.push(customer._id);
//       customer.reports.push(report._id);
//       await customer.save();
//     }

//     await report.save();
//     res.status(200).send(report);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
