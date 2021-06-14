import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [productList, setProductList] = useState<Record<string, any>[]>([]);

  const deleteProduct = async (id: number) => {
    await fetch(`/api/product/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const fetchProducts = async () => {
    const { products } = await (await fetch('/api/product')).json();
    setProductList(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {productList.map((product) => (
        <div key={product.id}>
          {JSON.stringify(product)}
          <button onClick={() => deleteProduct(product.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
