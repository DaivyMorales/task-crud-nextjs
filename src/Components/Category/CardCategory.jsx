import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StateContext } from "Context/StateContext";

export default function CardCategory({
  category,
  setCategories,
  categories,
  onChange,
  activeCategoryId,
}) {
  const { task, setTask, categoryCurrent, setCategoryCurrent } =
    useContext(StateContext);

  const [categoryHover, setCategoryHover] = useState(false);
  const [click, setClick] = useState(false);

  const deleteCategory = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/category/${id}`
    );
    setCategories(categories.filter((category) => category._id !== id));
  };

  return (
    <motion.div
      className="box-category border-gray-400 rounded-full flex justify-center items-center p-1 h-6 w-20 cursor-pointer hover:border-black hover:bg-white "
      whileHover={{ scale: 0.99 }}
      whileTap={{
        scale: 0.8,
      }}
      onMouseEnter={() => setCategoryHover(!categoryHover)}
      onMouseLeave={() => setCategoryHover(!categoryHover)}
      key={category._id}
      style={
        task.category === category._id
          ? { backgroundColor: "black", color: "white", borderWidth: "0px" }
          : {}
      }
      onClick={() => {
        onChange(category.name);
        setClick(!click);
        setTask({ ...task, category: category._id });
      }}
    >
      <p className="font-bold text-xs text-gray-500 hover:text-black ">
        {category.name}
      </p>
    </motion.div>
  );
}
