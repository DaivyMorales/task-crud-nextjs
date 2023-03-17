import mongoose, { Schema, model, models } from "mongoose";
import Category from "./Category";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxlength: [40, "Title must be less than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", taskSchema);
