import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCategory from "./CardCategory";
import { HiOutlinePlus, HiHashtag } from "react-icons/hi";
import CategoryForm from "Components/CategoryForm";

export default function ListCategory({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [categoryShow, setCategoryShow] = useState(false);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  // console.log(activeCategoryId);

  const handleCategoryCardClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const loadCategories = async () => {
    const response = await axios.get("http://localhost:3000/api/category");
    const data = response.data;
    setCategories(data);
  };

  console.log(categories);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className=" w-full flex justify-center items-center gap-x-2">
      <div className="flex justify-center items-center gap-x-1">
        <HiHashtag />
      <h2 className="font-semibold text-sm">Categories:</h2>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {categories.map((category, index) => (
          <CardCategory
            key={category._id || index}
            category={category}
            categories={categories}
            onChange={handleCategoryCardClick}
            activeCategoryId={activeCategoryId}
          />
        ))}

        {categoryShow ? (
          <CategoryForm
            setCategoryShow={setCategoryShow}
            categoryShow={categoryShow}
            categories={categories}
            setCategories={setCategories}
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
            <HiOutlinePlus color="black" />
          </button>
        )}
      </div>
    </div>
  );
}
