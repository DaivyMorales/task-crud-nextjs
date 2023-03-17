import { useState } from "react";
import { HiCheck } from "react-icons/hi";

export default function CategoryForm({
  categoryShow,
  setCategoryShow,
  categories,
  setCategories,
  onChange,
}) {
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
      await axios.post("http://localhost:3000/api/category", category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" flex gap-x-1 justify-center items-center">
        <input
          type="text"
          className="new-category-input font-bold text-xs"
          onChange={handleInputChange}
          value={formData.name}
        />
        <button
          onClick={async () => {
            setCategoryShow(!categoryShow);
            setCategories([...categories, formData]);
            onChange(formData.name);
            createCategory(formData);
          }}
          className="new-category-button"
        >
          <HiCheck color="white" />
        </button>
      </div>
    </div>
  );
}
