import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Create from "./config/Create";

import "./Categories.css";
import Edit from "./config/Edit";

const Categories = ({
  categories,
  setCategories,
  setCategoryFilter,
  categoryFilter,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      <li
        className={`list-item ${categoryFilter === "Tümü" && "!opacity-80"} `}
        onClick={() => setCategoryFilter("Tümü")}
      >
        <span>Tümü</span>
      </li>
      {categories.map((item) => (
        <li
          className={`list-item ${
            categoryFilter === item.title && "!opacity-80"
          } `}
          key={item._id}
          onClick={() => setCategoryFilter(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="list-item !bg-cyan-800"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined />
      </li>

      <li
        className="list-item !bg-orange-800"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined />
      </li>

      <Create
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />

      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
