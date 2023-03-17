import { motion } from "framer-motion";
import { HiXCircle } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

export default function CardCategory({
  category,
  setCategories,
  categories,
  onChange,
}) {
  const [categoryHover, setCategoryHover] = useState(false);
  const [click, setClick] = useState(false);

  const deleteCategory = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/category/${id}`
    );
    setCategories(categories.filter((category) => category._id !== id));
  };

  // const [selectedCategory, setSelectedCategory] = useState("");

  // const handleCategorySelection = (event) => {
  //   const newCategory = event.target.value;
  //   setSelectedCategory(newCategory);
  //   onChange(newCategory); // Llama la función onChange pasada como prop con la nueva categoría seleccionada
  // };

  return (
    <motion.div
      whileHover={{ scale: 0.99 }}
      whileTap={{
        scale: 0.8,
      }}
      onMouseEnter={() => setCategoryHover(!categoryHover)}
      onMouseLeave={() => setCategoryHover(!categoryHover)}
      // style={{
      //   backgroundColor: "gray",
      // }}
      className="border-2 border-gray-700 rounded-full flex justify-center items-center p-1 h-6 w-20 cursor-pointer hover:border-black hover:bg-white "
      key={category._id}
      style={click ? { backgroundColor: "White" } : {}}
      onClick={() => {
        // deleteCategory(category._id)
        setClick(!click);
        onChange(category.name);
      }}
    >
      <p className="font-bold text-xs text-gray-700 hover:text-black ">
        {category.name}
      </p>
    </motion.div>
  );
}
