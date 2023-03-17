import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "name is requered"],
      trim: true,
      maxlength: [18, "Name must be less than 18 characters"],
    },
    color: {
      type: String,
      require: [true, "name is requered"],
      trim: true,
      maxlength: [18, "Name must be less than 8 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Category || model("Category", categorySchema);
