import Products from "./pages/Products";
import Cart from "./pages/Cart";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CartContextProvider } from "./modules/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
