import { register } from "./auth.js"; // Assuming the register function is exported from auth.js
import bcrypt from 'bcryptjs';
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

