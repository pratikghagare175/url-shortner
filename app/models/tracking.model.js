const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
  {
    url_id: {
      type: String,
      unique: true,
    },
    is_active: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
  },
  { timestamps: true }
);

const trackingModel = mongoose.model(trackingSchema, "tracking");
module.exports = trackingModel;
