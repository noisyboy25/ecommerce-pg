import React from 'react';

const ProductList = ({
  fetchProducts,
  productList,
}: {
  fetchProducts: () => Promise<any>;
  productList: any[];
}) => {
  const deleteProduct = async (id: number) => {
    await fetch(`/api/product/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

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
