import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCategory from "./CardCategory";
import { HiOutlinePlus } from "react-icons/hi";
import CategoryForm from "Components/CategoryForm";

export default function ListCategory({
  category,
  value,
  onChange,
  createCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [categoryShow, setCategoryShow] = useState(false);

  const loadCategories = async () => {
    const response = await axios.get("http://localhost:3000/api/category");
    const data = response.data;
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className=" w-full flex justify-center items-center gap-x-2">
      <h2 className="font-semibold text-sm">Categories:</h2>

      <div className="grid grid-cols-3 gap-1">
        {categories.map((category, index) => (
          <CardCategory
            key={category._id || index}
            category={category}
            setCategories={setCategories}
            categories={categories}
            value={value}
            onChange={onChange}
          />
        ))}

        {categoryShow ? (
          <CategoryForm
            setCategoryShow={setCategoryShow}
            categoryShow={categoryShow}
            categories={categories}
            setCategories={setCategories}
            value={value}
            onChange={onChange}
          />
        ) : (
          ""
        )}

        {categoryShow ? (
          ""
        ) : (
          <button
            className="new-category-button flex justify-center items-center"
            onClick={() => {
              setCategoryShow(!categoryShow);
            }}
          >
            <HiOutlinePlus color="white" />
          </button>
        )}
      </div>
    </div>
  );
}
