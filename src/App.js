import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from "./components/review/Review";
import Inventory from "./components/inventory/Inventory";
import NotFound from "./components/notFound/NotFound";
import ProductDetail from "./components/productDetail/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({})
  console.log(loggedInUser.email);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>logged in email:{loggedInUser.email}</p>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
