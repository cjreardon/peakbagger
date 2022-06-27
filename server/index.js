const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PeakModel = require("./models/Peaks");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://cjreardon:rXEJmzJKD7lCV0lI@cluster0.xlf4d.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const peakName = req.body.peakName;
  const days = req.body.days;

  const peak = new PeakModel({ peakName: peakName, daysAgoHiked: days });

  try {
    await peak.save();
    res.send("Inserted");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newPeakName = req.body.newHikeName;
  const id = req.body.id;

  try {
    await PeakModel.findById(id, (err, updatedPeak) => {
      updatedPeak.peakName = newPeakName;
      updatedPeak.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  PeakModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await PeakModel.findByIdAndRemove(id).exec();

  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
