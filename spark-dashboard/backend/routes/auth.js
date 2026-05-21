const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Session = require("../models/Session");

const router = express.Router();

// POST /api/auth/verify-token
router.post("/verify-token", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is expired (5 minute window)
    const now = Math.floor(Date.now() / 1000);
    if (now - decoded.iat > 300) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Generate a session token
    const sessionToken = crypto.randomBytes(32).toString("hex");

    // Save session to MongoDB
    await Session.create({
      shop: decoded.shop,
      sessionToken,
    });

    return res.json({
      success: true,
      sessionToken,
      shop: decoded.shop,
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
});

// GET /api/auth/verify-session
router.get("/verify-session", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No session token provided" });
    }

    const sessionToken = authHeader.split(" ")[1];
    const session = await Session.findOne({ sessionToken });

    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    return res.json({
      success: true,
      shop: session.shop,
    });
  } catch (error) {
    console.error("Session verification failed:", error.message);
    return res.status(401).json({ error: "Invalid session" });
  }
});

module.exports = router;
