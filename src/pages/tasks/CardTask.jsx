import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { HiClipboard, HiExternalLink,HiCursorClick } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";

const CardTask = ({ task }) => {
  const [hoverTask, setHoverTask] = useState(false);
  const router = useRouter();
  const [category, setCategory] = useState([]);

  const colorCategory = {
    backgroundColor: category.color,
  };

  const loadCategory = async (categoryId) => {
    const response = await axios.get(
      `http://localhost:3000/api/category/${categoryId}`
    );

    setCategory(response.data);
  };

  

  useEffect(() => {
    loadCategory(task.category);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 0.99, rotate: 1 }}
      whileTap={{
        scale: 0.8,
      }}
      className="cardTask relative"
      onMouseEnter={() => setHoverTask(!hoverTask)}
      onMouseLeave={() => setHoverTask(!hoverTask)}
      onClick={() => router.push(`/tasks/${task._id}/edit`)}
      key={task._id}
    >
      <div className="bg-white p-2 rounded-full">
        <HiCursorClick color="" />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h2>{task.title}</h2>
        <p className="text-xs text-gray-400">15 de Marzo del 2023</p>
        <div
          style={colorCategory}
          className=" text-gray-200 rounded-full font-bold text-xs flex justify-center py-1 px-5"
        >
          {category.name}
        </div>
      </div>
      {hoverTask ? (
        <motion.div
          animate={{ scale: 1.1 }}
          className="absolute top-3 right-3 bg-white w-6 h-6 rounded-full flex justify-center items-center"
        >
          <HiExternalLink />
        </motion.div>
      ) : (
        <div></div>
      )}
    </motion.div>
  );
};

export default CardTask;
