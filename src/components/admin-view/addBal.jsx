// Import necessary modules
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Your User model

// Update user balance by email
router.put("/update-balance", async (req, res) => {
  const { email, balance } = req.body;

  try {
    // Find the user by email and update their balance
    const user = await User.findOneAndUpdate(
      { email },
      { balance },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Balance updated successfully", user });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;