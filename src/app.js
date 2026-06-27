const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);

// Error middleware
app.use(errorHandler);

module.exports = app;