const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PeakModel = require("./models/Peaks");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://cjreardon:rXEJmzJKD7lCV0lI@cluster0.xlf4d.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", async (req, res) => {
  const peak = new PeakModel({ peakName: "Washington", daysAgoHiked: 3 });

  try {
    await peak.save();
    res.send("Inserted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
