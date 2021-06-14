import React, { useEffect, useState } from 'react';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState<Record<string, any>[]>([]);

  const deleteCategory = async (id: number) => {
    await fetch(`/api/category/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const fetchCategories = async () => {
    const { categories } = await (await fetch('/api/category')).json();
    setCategoryList(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {categoryList.map((category) => (
        <div key={category.id}>
          {JSON.stringify(category)}
          <button onClick={() => deleteCategory(category.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
