const mongoose = require("mongoose");

const shorlinkSchema = new mongoose.Schema(
  {
    url_id: {
      type: String,
      unique: true,
    },
    url: {
      alias: {
        type: String,
      },
      original: {
        type: String,
        unique: true,
      },
      hash: {
        type: String,
        unique: true,
      },
    },
    is_active: {
      type: Boolean,
    },
    expire_at: {
      type: Number,
    },
  },
  { timestamps: true }
);

shorlinkSchema.pre("save", function (next) {
  this.url_id = this.url_id;
  next();
});

const shortlinkModel = mongoose.model(shorlinkSchema, "short_link");
module.exports = shortlinkModel;
