import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({
  onSubmit,
}: {
  onSubmit: (data: Record<string, any>) => void;
}) => {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const { register, handleSubmit } = useForm();

  const fetchCategories = async () => {
    const { categories } = await (await fetch('/api/category')).json();
    // TODO: Can't perform a React state update on an unmounted component.
    setCategoryList(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Name"
        type="text"
        {...register('name', { required: true })}
      />

      <select {...register('categoryId', { required: true })}>
        <option value="">select category...</option>
        {categoryList.map((category: any) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        defaultValue={0}
        step={0.01}
        min={0}
        type="number"
        {...register('price', { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default ProductForm;
