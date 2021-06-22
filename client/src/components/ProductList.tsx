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
    <div className="grid grid-cols-5">
      <div className="font-semibold">ID</div>
      <div className="font-semibold">Name</div>
      <div className="font-semibold">Category</div>
      <div className="font-semibold">Price</div>
      <div className="font-semibold"></div>
      {productList.map((product) => (
        <>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.category.name}</div>
          <div>{product.price}</div>
          <button
            className="w-6 h-6 bg-red-500 text-white rounded-md m-1"
            onClick={() => deleteProduct(product.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </>
      ))}
    </div>
  );
};

export default ProductList;
