import { FC } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Pizzas } from "./pages/Pizzas";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { Navigation } from "components/Navigation";

export const App: FC = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Pizzas} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/orders" component={Orders} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);
