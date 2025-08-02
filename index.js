const express = require("express");
const startCronJob = require("./cronJob");

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Cron Job Scheduler is running...");
});

// Start the cron job
startCronJob();

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

module.exports = app;