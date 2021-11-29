import { FC } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { Pizzas } from "./pages/Pizzas";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { Navigation } from "components/Navigation";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export const App: FC = () => (
  <ApolloProvider client={client}>
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
  </ApolloProvider>
);
