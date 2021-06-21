import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import CategoryList from './CategoryList';
import Products from './Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container mx-auto">
          <nav>
            <ul className="flex flex-row content-around text-center">
              <li className="flex-1">
                <NavLink exact to="/" activeStyle={{ color: 'blue' }}>
                  Home
                </NavLink>
              </li>
              <li className="flex-1">
                <NavLink to="/categories" activeStyle={{ color: 'blue' }}>
                  Categories
                </NavLink>
              </li>
              <li className="flex-1">
                <NavLink to="/products" activeStyle={{ color: 'blue' }}>
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
