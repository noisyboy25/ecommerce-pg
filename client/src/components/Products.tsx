import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const Products = () => {
  const [productList, setProductList] = useState<Record<string, any>[]>([]);

  const fetchProducts = async () => {
    const { products } = await (await fetch('/api/product')).json();
    setProductList(products);
  };

  const createProduct = async (product: Record<string, any>) => {
    const { newProduct, message } = await (
      await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
    ).json();
    console.log({ newProduct, message });
  };

  const onSubmit = async (data: Record<string, any>) => {
    console.log(data);
    await createProduct(data);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductForm onSubmit={onSubmit} />
      <ProductList productList={productList} fetchProducts={fetchProducts} />
    </div>
  );
};

export default Products;
