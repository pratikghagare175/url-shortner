const mongoose = require("mongoose");
const MongoDbService = require("../services/mongodb.service");

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
      },
      hash: {
        type: String,
        unique: true,
      },
    },
    is_active: {
      type: Boolean,
      default: true
    },
    click_count:{
      type:Number,
      default: 0
    },
    expire_at: {
      type: Number,
    },
  },
  { timestamps: true }
);

shorlinkSchema.index({"url.hash":1,is_active:1})
shorlinkSchema.index({"url.original":1, is_active:1})

shorlinkSchema.pre("save", function (next) {
  this.url_id = this._id;
  next();
});

const shortlinkModel = mongoose.model("short_link",shorlinkSchema);
const shortlinkService = new MongoDbService(shortlinkModel)
module.exports = shortlinkService;
