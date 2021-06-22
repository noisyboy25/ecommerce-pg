import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import CategoryList from './CategoryList';
import Products from './Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container mx-auto">
          <nav className="p-2">
            <ul className="flex flex-row content-around text-center">
              <li className="flex-1">
                <NavLink
                  exact
                  to="/"
                  activeClassName="text-white bg-blue-500 p-2 rounded-lg"
                >
                  Home
                </NavLink>
              </li>
              <li className="flex-1">
                <NavLink
                  to="/categories"
                  activeClassName="text-white bg-blue-500 p-2 rounded-lg"
                >
                  Categories
                </NavLink>
              </li>
              <li className="flex-1">
                <NavLink
                  to="/products"
                  activeClassName="text-white bg-blue-500 p-2 rounded-lg"
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/categories">
              <CategoryList />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
