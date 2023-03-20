// import { dbConnect } from "../../../utils/mongoose";
// import Task from "../../../models/Task";

import { dbConnect } from "utils/mongoose";
import Task from "models/Task";
import Category from "models/Category";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const { title, url, description } = body;

        const category = await Category.findOne({ _id: body.category });
        const newTask = new Task({ title, url, description, category });
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "This method isn't supported" });
  }
}
