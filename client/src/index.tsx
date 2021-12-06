import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { getPizzasFromCart } from "helpers";

import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems() {
          return getPizzasFromCart();
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
