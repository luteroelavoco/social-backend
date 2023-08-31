import mongoose from "mongoose";

const JsonSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Json = mongoose.model("Json", JsonSchema);

export { Json };
