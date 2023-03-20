import { useContext, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import axios from "axios";
import { StateContext } from "Context/StateContext";

export default function CategoryForm({
  categoryShow,
  setCategoryShow,
  categories,
  setCategories,
}) {
  const { task, setTask } = useContext(StateContext);

  const [formData, setFormData] = useState({
    name: "",
    color: "red",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ name: value, color: "red" });
  };

  const createCategory = async (category) => {
    try {
      const response = await axios.post(
        "https://task-crud-nextjs-f13i7k2w0-daivymorales-s-team.vercel.app/api/category",
        category
      );
      setTask({ ...task, category: response.data._id });
      setCategories([...categories, response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" flex gap-x-1 justify-center items-center">
        <input
          type="text"
          className="new-category-input font-medium text-xs"
          onChange={handleInputChange}
          value={formData.name}
        />
        <button
          onClick={async () => {
            setCategoryShow(!categoryShow);
            createCategory(formData);
          }}
          className="new-category-button"
        >
          <HiPlusCircle size={20} />
        </button>
      </div>
    </div>
  );
}
