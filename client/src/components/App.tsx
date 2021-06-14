import React from 'react';
import './App.css';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <CategoryList />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
