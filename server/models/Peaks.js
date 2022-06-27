const mongoose = require("mongoose");

const PeakSchema = new mongoose.Schema({
  peakName: {
    type: String,
    required: true,
  },
  daysAgoHiked: {
    type: Number,
    required: true,
  },
});

const Peak = mongoose.model("Peak", PeakSchema);
module.exports = Peak;
